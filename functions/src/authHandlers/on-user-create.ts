import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { auth } from 'firebase-functions';

const setupChatConfigForNewUser = async (user: admin.auth.UserRecord) => {
  logger.info('User created', user.uid);

  const userRef = admin.firestore().collection('users').doc(user.uid);
  logger.info('User ref', userRef);
  userRef.set({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
  logger.info('User data set', userRef);

  const questionsRef = await admin.firestore().collection('chat_config').get();
  questionsRef.docs.forEach((doc) => {
    logger.info(`copy doc to user ${user.uid}`, doc);
    userRef.collection('chat_config').doc(doc.id).set(doc.data());
  });

  logger.info(`chat config set for user ${user.uid}`);
};

export const createUserCollections = auth
  .user()
  .onCreate(setupChatConfigForNewUser);
