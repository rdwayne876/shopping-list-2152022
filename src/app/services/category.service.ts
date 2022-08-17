import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // rest server url
  private REST_API_SERVER = 'http://localhost:3000/api/v1/category/'

  // set request headers
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient) { }

  /**
   * Find all category records
   * @returns Array of all categorys
   */
   public index(): Observable<Category[]> {
    return this.http.get<Category[]>(this.REST_API_SERVER)
  }

  /**
   * Add a category record
   * @param body posted form data
   * @returns created shopping list category
   */
  public create( body:any): Observable<Category> {
    return this.http.post<Category>(this.REST_API_SERVER, body, this.HTTP_HEADER)
  }

  /**
   * Find a category record
   * @param id uses id to find category in db
   * @returns return the category found in db
   */
  public find( id:string): Observable<Category> {
    return this.http.get<Category>(`${this.REST_API_SERVER}${id}`)
  }

  /**
   * Update Category record
   * @param id uses category id to locate category to be updated
   * @param body takes form data to update located category
   * @returns returns category that was updated
   */
  public update( id:string, body:any): Observable<Category> {
    return this.http.patch<Category>(`${this.REST_API_SERVER}${id}`, body, this.HTTP_HEADER)
  }

  /**
   * Delete a category record
   * @param id uses category id to locate category to be deleted
   * @returns returns category that was deleted
   */
  public delete( id:string): Observable<Category> {
    return this.http.delete<Category>(`${this.REST_API_SERVER}${id}`)
  }
}
