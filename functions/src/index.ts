import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './authHandlers/on-user-create';
export * from './selectedQuestionsHandlers/on-add-selected-question';
