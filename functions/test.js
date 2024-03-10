const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

admin
  .firestore()
  .collection("books-reserved")
  .get()
  .then((data) =>
    data.docs.map((doc) => {
      const snapshot = doc.data();

      const dateCreated =
        doc.data().createdAt._seconds * 1000 +
        Math.floor(doc.data().createdAt._nanoseconds / 1000000);

      const past = new Date(
        admin.firestore.Timestamp.now().toMillis() - 24 * 60 * 60 * 1000
      );

      console.log(dateCreated < past);

      if (dateCreated < past) {
        console.log("Cancelled " + doc.id);
      } else {
      }
    })
  );
