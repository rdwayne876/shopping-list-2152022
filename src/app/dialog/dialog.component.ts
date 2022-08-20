import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { Category } from '../models/category';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  itemList: any[] = [];
  categories: any[] = [];
  itemForm !: FormGroup;
  actionBtn: string = "Save";
  completed: boolean = false;
  title: string = "Add Item"

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>,
    private api: ApiService,
    private itemService: ItemService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.getCategories();

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      notes: ['']
    })
    // console.log(this.editData);

    if (this.editData) {
      this.title = "Edit Item"
      console.log(this.editData);

      this.actionBtn = "Update";
      this.itemForm.controls['name'].setValue(this.editData.name);
      this.itemForm.controls['quantity'].setValue(this.editData.quantity);
      this.itemForm.controls['price'].setValue(this.editData.price);
      this.itemForm.controls['notes'].setValue(this.editData.notes);
    }

  }

  addProduct() {
    console.log(this.itemForm.value);
    if (!this.editData) {
      if (this.itemForm.valid) {
        this.itemService.create(this.itemForm.value).subscribe({
          next: (res) => {
            if (res) {
              alert("Item added successfully!");
              this.itemForm.reset();
              this.dialogref.close('save');
            }
          },
          error: (err) => {
            alert(err)
          }
        })
      }
    } else {
      this.updateItem()
    }
  }

  updateItem() {
    this.itemService.update(this.editData._id, this.itemForm.value).subscribe({
      next: (res) => {
        if (res) {
          alert("Item Updated successfully");
          this.itemForm.reset;
          this.dialogref.close('update');
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }



  getItemList() {
    this.api.getItem()
      .subscribe({
        next: (res) => {
          this.itemList = res;
          console.log(this.itemList);
        }, complete: () => {
          this.completed = true;
        }
      })
  }

  getCategories() {

    this.categoryService.index().subscribe({
      next: (res: any) => {
        console.log(res);

        res.data.categorys.forEach((category: Category) => {
          this.categories.push({
            name: category.name,
            id: category._id
          })
        })

        console.log(this.categories);
      }
    })

  }

}
