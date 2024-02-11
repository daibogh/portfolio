import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './authHandlers/on-user-create';
