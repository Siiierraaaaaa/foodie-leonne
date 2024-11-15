import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-preview',
  template: `
    <div class="preview-container">
      <div class="preview-header">
        <h2>{{ post.title }}</h2>
        <div class="meta">
          <span>Status: {{ post.status }}</span>
          <span *ngIf="post.publishedAt">Scheduled: {{ post.publishedAt | date:'medium' }}</span>
        </div>
      </div>
      
      <div class="featured-image" *ngIf="post.imageUrl">
        <img [src]="post.imageUrl" [alt]="post.title">
      </div>
      
      <div class="content" [innerHTML]="sanitizedContent"></div>
      
      <div class="seo-preview">
        <h3>SEO Preview</h3>
        <div class="google-preview">
          <div class="title">{{ post.seoMetadata.ogTitle || post.title }}</div>
          <div class="url">{{ generatePreviewUrl() }}</div>
          <div class="description">{{ post.seoMetadata.description }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preview-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .preview-header {
      margin-bottom: 20px;
    }
    
    .meta {
      color: #666;
      font-size: 0.9em;
      span {
        margin-right: 15px;
      }
    }
    
    .featured-image {
      margin: 20px 0;
      img {
        max-width: 100%;
        border-radius: 4px;
      }
    }
    
    .content {
      font-size: 1.1em;
      line-height: 1.6;
    }
    
    .seo-preview {
      margin-top: 30px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 4px;
      
      h3 {
        margin-bottom: 15px;
        color: #333;
      }
    }
    
    .google-preview {
      font-family: Arial, sans-serif;
      
      .title {
        color: #1a0dab;
        font-size: 18px;
        margin-bottom: 3px;
      }
      
      .url {
        color: #006621;
        font-size: 14px;
        margin-bottom: 3px;
      }
      
      .description {
        color: #545454;
        font-size: 13px;
        line-height: 1.4;
      }
    }
  `]
})
export class PostPreviewComponent {
  @Input() post!: Post;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  get sanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
  }
  
  generatePreviewUrl(): string {
    return `yourdomain.com/blog/${this.post.category}/${this.post.slug}`;
  }
}
