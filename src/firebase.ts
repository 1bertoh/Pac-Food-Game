import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

// usar proxy para ocultar os dados do firebase
export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBomPh0PjvdcgRA_8dFxzbhElElVPYTmUI',
  authDomain: 'pacfood-game.firebaseapp.com',
  databaseURL: 'https://pacfood-game.firebaseio.com',
  projectId: 'pacfood-game',
  storageBucket: 'pacfood-game.appspot.com',
  messagingSenderId: '824884447357',
  appId: '1:824884447357:web:30ae927b4ca55a4d590914',
  measurementId: 'G-WPRPMZ1ZFD',
});

export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get() {
      return firebaseApp;
    },
  });
}
