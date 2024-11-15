import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Observable, from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private analytics: Analytics
  ) { }

  // Authentication methods
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Firestore methods
  addPost(category: string, data: any): Observable<string> {
    const postCollection = collection(this.firestore, category);
    return from(
      addDoc(postCollection, {
        ...data,
        timestamp: new Date()
      })
    ).pipe(
      map(docRef => docRef.id)
    );
  }

  getPosts(category: string): Observable<any[]> {
    const postCollection = collection(this.firestore, category);
    const q = query(postCollection, orderBy('timestamp', 'desc'));
    
    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    );
  }

  deletePost(category: string, postId: string): Observable<void> {
    const postDoc = doc(this.firestore, category, postId);
    return from(deleteDoc(postDoc));
  }

  // Storage methods
  uploadImage(file: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap(() => from(getDownloadURL(storageRef)))
    );
  }

  // Analytics methods
  logPageView(pageName: string) {
    logEvent(this.analytics, 'page_view', {
      page_name: pageName
    });
  }
}
