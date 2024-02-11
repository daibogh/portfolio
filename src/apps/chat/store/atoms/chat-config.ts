import { getFirebase } from '@/firebase/firebase';
import { query, collection, orderBy, Query } from 'firebase/firestore';
import { firebaseColAtom } from 'utils/firebase-col-atom';

const { firestore } = getFirebase();
const { store: chatConfigColAtom, dispose } = firebaseColAtom({
  query: query(
    collection(firestore, 'chat_config'),
    orderBy('idx', 'asc'),
  ) as Query<{
    id: string;
    idx: number;
    messageType: string;
    text: string;
  }>,
});

chatConfigColAtom.subscribe((col) => {
  console.log(col);
});

export { chatConfigColAtom, dispose };
