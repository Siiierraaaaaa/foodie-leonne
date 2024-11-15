import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private readonly CLOUD_NAME = 'foodie-leonne';
  private readonly UPLOAD_PRESET = 'foodie_leonne_preset';
  private readonly UPLOAD_URL = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`;

  constructor(private http: HttpClient) {}

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.UPLOAD_PRESET);
      formData.append('folder', 'posts');

      const response = await firstValueFrom(
        this.http.post<any>(this.UPLOAD_URL, formData)
      );

      return response.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  }
}
