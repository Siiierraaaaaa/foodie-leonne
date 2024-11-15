import { Injectable } from '@angular/core';
import { 
  Firestore, 
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  waitForPendingWrites 
} from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  constructor(private firestore: Firestore) {
    this.initializeFirestore();
  }

  private async initializeFirestore() {
    try {
      // Enable offline persistence
      if (!environment.production) {
        await enableMultiTabIndexedDbPersistence(this.firestore);
      } else {
        await enableIndexedDbPersistence(this.firestore);
      }

      // Wait for any pending writes
      await waitForPendingWrites(this.firestore);

      console.log('Firestore initialized successfully with offline persistence');
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support offline persistence.');
      } else {
        console.error('Error initializing Firestore:', err);
      }
    }
  }
}
