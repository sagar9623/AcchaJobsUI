// src/app/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin'; // Backend API URL
  adminNameSubject: any;

  constructor(private http: HttpClient) {}

  registerAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerAdmin `,admin);
  }



  /**
   * Login Admin
   * @param username - Admin username
   * @param password - Admin password
   * @returns Observable<string>
   */
  loginAdmin(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/loginAdmin`, { username, password });
  }


  /**
   * Fetch admin by ID
   * @param adminId - Admin ID
   * @returns Observable<Admin>
   */
  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/get/${adminId}`).pipe(
      catchError(this.handleError('getAdminById'))
    );
  }


  // Error handling helper
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation}: ${error.message || 'unknown error'}`));
    };
  }

  setAdminName(name: string): void {
    this.adminNameSubject.next(name);
  }

  // Get the admin's username
  getAdminName() {
    return this.adminNameSubject.asObservable(); // Returns an observable
  }
  private handleErrors(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetails: ${error.error}`;
      }
    }
    return throwError(errorMessage);
  }

  postJob(adminId: number, job: any): Observable<string> {
    const url = `${this.baseUrl}/JobPost/${adminId}`;
    return this.http.post<string>(url, job).pipe(catchError(this.handleErrors));
  }

  postInternship(adminId: number, internship: any): Observable<string> {
    const url = `${this.baseUrl}/postInternship/${adminId}`;
    return this.http.post<string>(url, internship).pipe(catchError(this.handleErrors));
  }
}
