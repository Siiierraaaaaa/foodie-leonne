import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-must-trys',
  templateUrl: './must-trys.component.html',
  styleUrls: ['./must-trys.component.scss'],
  providers: [DatePipe]
})
export class MustTrysComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  loading = true;
  error: string | null = null;

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
    
    this.postService.getPostsByCategory('must-trys' as const)
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading must-try posts:', error);
          this.error = 'Failed to load must-try dishes. Please try again later.';
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
    if (!date) return '';
    return this.datePipe.transform(date, 'MMMM d, yyyy') || '';
  }
}
