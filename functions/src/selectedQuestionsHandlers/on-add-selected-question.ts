import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-functions';

export const configureIdxForSelectedQuestion = firestore
  .document('/users/{userId}/selected_questions/{questionId}')
  .onCreate(async (snapshot, ctx) => {
    const { userId, questionId } = ctx.params;
    logger.info('User selected question', userId, questionId);
    const docRef = admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('selected_questions')
      .doc(questionId);
    const allSelectedQuestions = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('selected_questions')
      .get();
    docRef.set({ idx: allSelectedQuestions.size - 1 }, { merge: true });
    logger.info(
      `set idx for user: ${userId} question: ${questionId} = ${
        allSelectedQuestions.size - 1
      }`,
    );
  });
