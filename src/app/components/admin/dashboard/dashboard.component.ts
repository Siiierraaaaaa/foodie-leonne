import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  error: string | null = null;
  editingPost: Post | null = null;

  categories = [
    { value: 'restaurant-reviews', label: 'Restaurant Reviews' },
    { value: 'holiday-dishes', label: 'Holiday Dishes' },
    { value: 'leonne-favorites', label: 'Leonne Favorites' },
    { value: 'quick-bites', label: 'Quick Bites' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'must-trys', label: 'Must Trys' }
  ];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private cloudinaryService: CloudinaryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
      category: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.maxLength(160)]],
      status: ['draft'],
      publishedAt: [null]
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.error = 'Failed to load posts';
        this.loading = false;
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.postForm.valid) {
      this.loading = true;
      this.error = null;

      try {
        const formData = this.postForm.value;

        if (this.editingPost) {
          await this.postService.updatePost(
            this.editingPost.id!,
            formData,
            this.selectedImage || undefined
          );
        } else {
          await this.postService.createPost(formData, this.selectedImage || undefined);
        }

        this.resetForm();
        this.loadPosts();
      } catch (error) {
        console.error('Error saving post:', error);
        this.error = 'Failed to save post';
      } finally {
        this.loading = false;
      }
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  editPost(post: Post): void {
    this.editingPost = post;
    this.postForm.patchValue({
      title: post.title,
      content: post.content,
      category: post.category,
      excerpt: post.excerpt,
      status: post.status,
      publishedAt: post.publishedAt
    });
    this.imagePreview = post.imageUrl || null;
  }

  async deletePost(postId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await this.postService.deletePost(postId);
        this.loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        this.error = 'Failed to delete post';
      }
    }
  }

  resetForm(): void {
    this.postForm.reset({ status: 'draft' });
    this.editingPost = null;
    this.selectedImage = null;
    this.imagePreview = null;
    this.error = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
