import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { config } from './config';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
function initialize() {
  const firebaseApp = initializeApp(config.firebase);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}
type FirebaseParams = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};
function connectToEmulators({ firebaseApp, auth, firestore }: FirebaseParams) {
  if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    const functions = getFunctions(firebaseApp);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  }
  return { firebaseApp, auth, firestore };
}

export function getFirebase() {
  const existingApp = getApps().at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return services;
}
