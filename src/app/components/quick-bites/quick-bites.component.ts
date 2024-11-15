import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quick-bites',
  templateUrl: './quick-bites.component.html',
  styleUrls: ['./quick-bites.component.scss']
})
export class QuickBitesComponent implements OnInit {
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
    this.postService.getPostsByCategory('quick-bites').subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error = 'Failed to load quick bites';
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

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'longDate') || '';
  }
}
