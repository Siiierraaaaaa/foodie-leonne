import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
  DocumentReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { CloudinaryService } from './cloudinary.service';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private firestore: Firestore,
    private cloudinaryService: CloudinaryService
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Get all posts
  getPosts(): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
    return collectionData(postsQuery, { idField: 'id' }).pipe(
      map(posts => posts as Post[])
    );
  }

  // Get posts by category
  getPostsByCategory(category: 'restaurant-reviews' | 'holiday-dishes' | 'leonne-favorites' | 'quick-bites' | 'desserts' | 'must-trys'): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const categoryQuery = query(
      postsCollection,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    return collectionData(categoryQuery, { idField: 'id' }).pipe(
      map(posts => posts as Post[])
    );
  }

  // Create a new post
  async createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, image?: File): Promise<string> {
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await this.cloudinaryService.uploadImage(image);
      }

      const now = new Date();
      const postData = {
        ...post,
        imageUrl,
        createdAt: now,
        updatedAt: now,
        slug: this.generateSlug(post.title),
        status: post.status || 'draft',
        seoMetadata: {
          description: post.seoMetadata?.description || '',
          keywords: post.seoMetadata?.keywords || [],
          ogTitle: post.seoMetadata?.ogTitle,
          ogDescription: post.seoMetadata?.ogDescription,
          ogImage: post.seoMetadata?.ogImage
        }
      };

      const docRef = await addDoc(collection(this.firestore, 'posts'), postData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  // Update a post
  async updatePost(id: string, post: Partial<Post>, newImage?: File): Promise<void> {
    try {
      const postRef = doc(this.firestore, 'posts', id);
      const updateData: Partial<Post> = {
        ...post,
        updatedAt: new Date()
      };

      if (newImage) {
        updateData.imageUrl = await this.cloudinaryService.uploadImage(newImage);
      }

      await updateDoc(postRef, updateData);
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }

  // Delete a post
  async deletePost(id: string): Promise<void> {
    try {
      const postRef = doc(this.firestore, 'posts', id);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }

  // Get a single post by ID
  async getPost(id: string): Promise<Post | undefined> {
    try {
      const postRef = doc(this.firestore, 'posts', id);
      const docSnap = await getDoc(postRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return { ...data, id: docSnap.id } as Post;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting post:', error);
      throw new Error('Failed to get post');
    }
  }
}
