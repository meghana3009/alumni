import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCszh77XYkt2bKPAlPTN1OWbMyiRrqk5kU",
  authDomain: "se-alumniportal.firebaseapp.com",
  databaseURL: "https://se-alumniportal.firebaseio.com",
  projectId: "se-alumniportal",
  storageBucket: "se-alumniportal.appspot.com",
  messagingSenderId: "695556028036",
  appId: "1:695556028036:web:df8457e10e1c306420b4d1",
  measurementId: "G-HGNS3K4G3V"
};

const fire = firebase.initializeApp(config);
export default fire;
export const auth = firebase.auth();
