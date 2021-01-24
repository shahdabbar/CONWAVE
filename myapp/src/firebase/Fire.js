import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAYS1qwE8EDENo3uB-WjYJH5XtSl_Ijq1s",
        authDomain: "finalproject-conwave.firebaseapp.com",
        databaseURL: "https://finalproject-conwave-default-rtdb.firebaseio.com",
        projectId: "finalproject-conwave",
        storageBucket: "finalproject-conwave.appspot.com",
        messagingSenderId: "93535327530",
        appId: "1:93535327530:web:f1c72aeaf2bcfd96913a53",
        measurementId: "G-BS078CHNQR",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (message) => {
    message.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("message");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
