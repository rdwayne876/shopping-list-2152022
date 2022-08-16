import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // rest server url
  private REST_API_SERVER = 'http://localhost:3000/api/v1/item/'

  // set request headers
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient) { }

  /**
   * Find all item records
   * @returns Array of all items
   */
  public index(): Observable<Item[]> {
    return this.http.get<Item[]>(this.REST_API_SERVER)
  }

  /**
   * Add an item record
   * @param body posted form data
   * @returns created shopping list item
   */
  public create( body:any): Observable<Item> {
    return this.http.post<Item>(this.REST_API_SERVER, body, this.HTTP_HEADER)
  }

  /**
   * Find an item record
   * @param id uses id to find item in db
   * @returns return the item found in db
   */
  public find( id:string): Observable<Item> {
    return this.http.get<Item>(`${this.REST_API_SERVER}${id}`)
  }

  /**
   * Update Item record
   * @param id uses item id to locate item to be updated
   * @param body takes form data to update located item
   * @returns returns item that was updated
   */
  public update( id:string, body:any): Observable<Item> {
    return this.http.patch<Item>(`${this.REST_API_SERVER}${id}`, body, this.HTTP_HEADER)
  }

  /**
   * Delete an item record
   * @param id uses item id to locate item to be deleted
   * @returns returns item that was deleted
   */
  public delete( id:string): Observable<Item> {
    return this.http.delete<Item>(`${this.REST_API_SERVER}${id}`)
  }
}
