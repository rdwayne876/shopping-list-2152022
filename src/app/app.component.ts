import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Item } from './models/item';
import { ItemService } from './services/item.service';

export interface shoppingItems{
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemCategory: string;
  itemNotes: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class AppComponent implements OnInit{
  title = 'Awesome Shopping List';

  displayedColumns: string[] = ['Name', 'Quantity', 'Price', 'Category', 'Notes', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  data: any = {};
  items!: Item[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog: MatDialog, 
              private itemService : ItemService) {}
  
  ngOnInit(): void {
    this.getAllItems()

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '90%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllItems();
      }
    })
      ;
  }

  getAllItems(): void {
    this.itemService.index().subscribe({
      next: (resp: any) => {
        console.log(resp);

        this.items = resp.data
        console.log(this.items);

        this.dataSource = new MatTableDataSource(resp.data.items)
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
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

  editItem(row: any) {
    this.dialog.open(DialogComponent, {
      width: '90%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllItems()
      }
    });
  }

  deleteItem(id: string) {
    this.itemService.delete( id).subscribe({
      next: ( resp) => {
        if( resp) {
          this.getAllItems()
        }
      }, error: ( err) => {
        console.error( err);
      }
    })
  }

  
}
