import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.css'],
  providers: [DatePipe]
})
export class RestaurantReviewsComponent implements OnInit {
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
    
    this.postService.getPostsByCategory('restaurant-reviews')
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading restaurant reviews:', error);
          this.error = 'Failed to load restaurant reviews. Please try again later.';
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
