import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  itemsUrl = 'http://10.44.16.133:3000/itemList/';

  postItem(data : any){
    return this.http.post<any>(this.itemsUrl, data)
  }

  getItem(){
    return this.http.get<any>(this.itemsUrl);
  }

  putItem(data:any, id: number){
    return this.http.put<any>(this.itemsUrl+id, data)
  }

  deleteItem(id: number){
    return this.http.delete<any>(this.itemsUrl+id)
  }

  checkItemName(data: any){
    return this.http.get(this.itemsUrl, data)
  }
}
