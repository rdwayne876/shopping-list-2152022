import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Awesome Shopping List';

  displayedColumns: string[] = ['itemName', 'itemQuantity', 'itemPrice', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService) {}
  
  ngOnInit(): void {
    this.getAllItems();
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllItems();
      }
    })
    ;
  }

  getAllItems(){
    this.api.getItem()
    .subscribe({
      next:(res) =>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) =>{
        alert("Oops, something went wrong...")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  editItem(row : any){
    this.dialog.open(DialogComponent,{
      width: '40%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllItems()
      }
    });
  }

  deleteItem(id: number){
    this.api.deleteItem(id)
    .subscribe({
      next:(res)=>{
        alert("Item deleted successfully");
        this.getAllItems();
      },
      error: ()=>{
        alert("Oops, something went wrong...");
      }
    });
  }
}
