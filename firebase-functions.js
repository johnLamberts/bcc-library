/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
// /* eslint-disable require-jsdoc */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable linebreak-style */
// /* eslint-disable object-curly-spacing */
// /* eslint-disable comma-dangle */
// /* eslint-disable indent */
// /**

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

    const msg = {
      to: result.email,
      from: "librsystem.e@gmail.com",
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
            from: "librsystem.e@gmail.com",
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
          await admin.firestore().doc(`availability/${doc.id}`).delete();
          return sgMail.send(msg);
        } else {
          doc.ref.update({ status: "Active" });
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
            from: "librsystem.e@gmail.com",
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

            booksTransactionRef.docs.map(async (transactDoc) =>
              admin
                .firestore()
                .doc(`books-transaction/${transactDoc.id}`)
                .update({
                  status: "Cancelled",
                  modifiedAt: admin.firestore.Timestamp.now(),
                })
            );
            await admin.firestore().doc(`books-reserved/${doc.id}`).delete();

            return sgMail.send(msg);
          } else {
            doc.ref.update({ status: "Reserved" });
          }
        });
      });
  });

// const userUids = [];
// admin
//   .firestore()
//   .collection("users")
//   .where("userRole", "==", "Student")
//   .get()
//   .then((users) =>
//     users.docs.map(async (doc) => {
//       const studentsRef = await admin
//         .firestore()
//         .collection("students")
//         .where("userDocID", "==", doc.id)
//         .get();

//       studentsRef.docs.map(
//         async (studDoc) =>
//           await admin.firestore().doc(`students/${studDoc.id}`).delete()
//       );

//       userUids.push(doc.data().userUID);
//       doc.ref.delete();
//     })
//   );
// admin.auth().deleteUsers(userUids);
