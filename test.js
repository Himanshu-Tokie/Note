const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUserCollection = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const userRef = admin.firestore().collection("users").doc(uid);
  await userRef.set({
    email: user.email,
    displayName: user.displayName,
    labels: {
      other: {
        name: "Other",
      },
    },
    notes: {
      defaultNote: {
        content: "Default note content...",
        labelId: "other",
      },
    },
  });
});
