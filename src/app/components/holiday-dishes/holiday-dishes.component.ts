import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-holiday-dishes',
  templateUrl: './holiday-dishes.component.html',
  styleUrls: ['./holiday-dishes.component.css'],
  providers: [DatePipe]
})
export class HolidayDishesComponent implements OnInit {
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
    
    this.postService.getPostsByCategory('holiday-dishes')
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading holiday dishes:', error);
          this.error = 'Failed to load holiday dishes. Please try again later.';
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
