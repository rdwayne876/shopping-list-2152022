import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';

export interface shoppingItems{
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemCategory: string;
  itemNotes: string
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})

export class PanelComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Quantity', 'Price'];
  dataSource!: MatTableDataSource<any>;
  expandedItem: shoppingItems | null | undefined;
  data: any ={};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService) {}
  
  ngOnInit(): void {
    this.getAllItems();
    console.log(this.dataSource);
    
    // console.log(MatTableDataSource)
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '90%'
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
        console.log(res);
        this.data = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      width: '90%',
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
