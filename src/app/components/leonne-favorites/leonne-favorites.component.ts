import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leonne-favorites',
  templateUrl: './leonne-favorites.component.html',
  styleUrls: ['./leonne-favorites.component.css'],
  providers: [DatePipe]
})
export class LeonneFavoritesComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  loading = false;
  error: string | null = null;

  constructor(private postService: PostService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.postService.getPostsByCategory('leonne-favorites')
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
          this.error = 'Failed to load favorites. Please try again later.';
          this.loading = false;
        }
      });
  }

  openPostDetails(post: Post): void {
    this.selectedPost = post;
    document.body.style.overflow = 'hidden';
  }

  closePostDetails(): void {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }
}
