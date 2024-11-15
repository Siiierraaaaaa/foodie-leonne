import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css'],
  providers: [DatePipe]
})
export class DessertsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;
  selectedPost: Post | null = null;

  constructor(
    private postService: PostService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.postService.getPostsByCategory('desserts').subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dessert posts:', error);
        this.error = 'Failed to load desserts. Please try again later.';
        this.loading = false;
      }
    });
  }

  openPostDetails(post: Post): void {
    this.selectedPost = post;
  }

  closePostDetails(): void {
    this.selectedPost = null;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMMM d, yyyy') || '';
  }
}
