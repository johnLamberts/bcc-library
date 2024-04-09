/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

const API_KEY = functions.config().sendgrid.api_key;
const TEMPLATE_ID = functions.config().sendgrid.new_users;

const OVERDUE_TEMPLATE_ID = functions.config().sendgrid.overdue_template;
const AUTOMATE_CANCELLED_RESERVE =
  functions.config().sendgrid.automate_cancelled_reserved;

sgMail.setApiKey(API_KEY);

exports.welcomeEmailv2 = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snapshot, _context) => {
    const result = snapshot.data();
    await admin
      .firestore()
      .collection("activity-logs-timeline")
      .add({
        actionType: "Automatic Welcome Email Notification",
        actions: `kuwago@bcc-opac-library.site sent an email to ${result.email}`,
        createdAt: admin.firestore.Timestamp.now(),
        currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
        image:
          "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
      });
    const msg = {
      to: result.email,
      from: "kuwago@bcc-opac-library.site",
      fullName: `${result.firstName} ${result.middleName} ${result.lastName}`,
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: "Welcome to OPAC Binangonan Catholic College",
        fullName: `${result.firstName} ${result.middleName} ${result.lastName}`,
        email: result.email,
        password: result.password,
      },
    };

    return sgMail.send(msg);
  });

exports.taskRunner = functions
  .runWith({ memory: "4GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async () => {
    const testData = admin.firestore().collection("availability").get();

    return await testData.then((data) => {
      return data.docs.forEach(async (doc) => {
        const snapshot = doc.data();
        const { expiryTime } = snapshot;

        const timeNow = admin.firestore.Timestamp.now().toMillis();
        if (expiryTime < timeNow) {
          doc.ref.update({ status: "Overdue" });

          const msg = {
            to: snapshot.borrowersEmail,
            from: "kuwago@bcc-opac-library.site",
            fullName: snapshot.borrowersName,
            templateId: OVERDUE_TEMPLATE_ID,
            dynamic_template_data: {
              fullName: snapshot.borrowersName,
              bookType: snapshot.bookType,
              bookTitle: snapshot.bookTitle,
              bookISBN: snapshot.bookISBN,
            },
          };

          const booksTransactionRef = await admin
            .firestore()
            .collection("books-transaction")
            .where("booksBorrowedId", "==", doc.data().booksBorrowedId)
            .get();

          booksTransactionRef.docs.map(async (doc) =>
            admin.firestore().doc(`books-transaction/${doc.id}`).update({
              status: "Overdue",
              modifiedAt: admin.firestore.Timestamp.now(),
            })
          );

          await admin
            .firestore()
            .doc(`books-borrowed/${doc.data().booksBorrowedId}`)
            .update({
              status: "Overdue",
              modifiedAt: admin.firestore.Timestamp.now(),
            });

          await admin
            .firestore()
            .collection("activity-logs-timeline")
            .add({
              actionType: "Automatic Overdue Email Notification",
              actions: `kuwago@bcc-opac-library.site sent an overdue email to ${snapshot.email}`,
              createdAt: admin.firestore.Timestamp.now(),
              currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
              image:
                "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
            });

          await admin.firestore().doc(`availability/${doc.id}`).delete();

          return sgMail.send(msg);
        } else {
          doc.ref.update({ status: "Active" });
        }
      });
    });
  });

exports.booksQuantityChecker = functions
  .runWith({ memory: "4GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async () => {
    const testData = admin.firestore().collection("books-catalogue").get();

    return await testData.then((data) => {
      return data.docs.forEach(async (doc) => {
        const snapshot = doc.data();

        if (snapshot.numberOfBooksAvailable_QUANTITY === 0) {
          return doc.ref.update({
            bookStatus: "Out of Stock",
          });
        } else if (
          snapshot.numberOfBooksAvailable_QUANTITY > 0 &&
          snapshot.bookStatus === "Out of Stock"
        ) {
          return doc.ref.update({
            bookStatus: "Active",
          });
        } else {
          return doc.ref.update({
            bookStatus: snapshot.bookStatus,
          });
        }
      });
    });
  });

exports.documentReservedChecker = functions
  .runWith({ memory: "4GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async () => {
    admin
      .firestore()
      .collection("books-reserved")
      .get()
      .then((docs) => {
        return docs.docs.map(async (doc) => {
          const snapshot = doc.data();

          const msg = {
            to: snapshot.borrowersEmail,
            from: "kuwago@bcc-opac-library.site",
            fullName: snapshot.borrowersName,
            templateId: AUTOMATE_CANCELLED_RESERVE,
            dynamic_template_data: {
              fullName: snapshot.borrowersName,
              bookTitle: snapshot.bookTitle,
            },
          };

          const dateCreated =
            doc.data().createdAt._seconds * 1000 +
            Math.floor(doc.data().createdAt._nanoseconds / 1000000);

          const past = new Date(
            admin.firestore.Timestamp.now().toMillis() - 24 * 60 * 60 * 1000
          );

          if (dateCreated < past) {
            const booksTransactionRef = await admin
              .firestore()
              .collection("books-transaction")
              .where("reservedId", "==", doc.id)
              .get();

            booksTransactionRef.docs.map(
              async (transactDoc) =>
                await admin
                  .firestore()
                  .doc(`books-transaction/${transactDoc.id}`)
                  .update({
                    status: "Cancelled",
                    modifiedAt: admin.firestore.Timestamp.now(),
                  })
            );

            const booksRef = await admin
              .firestore()
              .doc(`books-catalogue/${doc.data().booksId}`)
              .get();

            await admin
              .firestore()
              .doc(`books-catalogue/${doc.data().booksId}`)
              .update({
                numberOfBooksAvailable_QUANTITY: doc.data()
                  .numberOfBooksAvailable_QUANTITY++,
                bookStatus:
                  booksRef.data().bookStatus === "Out of Stock"
                    ? "Active"
                    : booksRef.data().bookStatus,
              });

            await admin
              .firestore()
              .collection("activity-logs-timeline")
              .add({
                actionType: "Automatic Cancel Reserved Email Notifiaction",
                actions: `kuwago@bcc-opac-library.site sent an email to cancel reserve to ${snapshot.bookTitle} by ${snapshot.firstName} ${snapshot.lastName}`,
                createdAt: admin.firestore.Timestamp.now(),
                currentUser: `kuwago@bcc-opac-library.site mailer-sender`,
                image:
                  "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391",
              });
            await admin.firestore().doc(`books-reserved/${doc.id}`).delete();
            return sgMail.send(msg);
          } else {
            doc.ref.update({ status: "Reserved" });
          }
        });
      });
  });
