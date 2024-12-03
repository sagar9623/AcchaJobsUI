import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'http://localhost:8080/api/superAdmin'; // Adjust the port if needed

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllAdmins`);
  }

  approveAdmin(adminId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/approveAdmin/${adminId}`, {});
  }

  disableAdmin(adminId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/disableAdmin/${adminId}`, {});
  }

  // Post management
  getAllPendingPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllPendingPosts`);
  }

  approvePost(postId: number, isApproved: boolean): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/approvePost/${postId}?isApproved=${isApproved}`, {});
  }

  disapprovePost(postId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/disapprovePost/${postId}`, {});
  }

  // setPremiumPrice(adminId: number, price: number): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/setPremiumPrice/${adminId}`, { price });
  // }
}
