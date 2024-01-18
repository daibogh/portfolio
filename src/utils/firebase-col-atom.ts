import {
  getDocs,
  collection,
  query,
  where,
  Query,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { atom } from 'nanostores';
//should receive name of the atom, firestore query instance
// should crate nanostres atom and make subscription to firestore snapshot to update atom
type FirebaseAtomProps = {
  query: any;
};
export const firebaseColAtom = ({ query }: FirebaseAtomProps) => {
  const store = atom<any>([] as any);
  const dispose = onSnapshot(query, (snapshot: any) => {
    const data = snapshot.docs.map((doc: any) => doc.data());
    store.set(data);
  });
  return { store, dispose };
};
