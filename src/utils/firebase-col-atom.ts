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
export const firebaseColAtom = <
  AppModelType,
  DbModelType extends DocumentData,
>({
  query,
}: {
  query: Query<AppModelType, DbModelType>;
}) => {
  const store = atom<AppModelType[]>([]);
  const dispose = onSnapshot(query, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    store.set(data);
  });
  return { store, dispose };
};
