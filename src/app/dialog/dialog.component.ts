import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // categories = getCategories();
  itemList: any[] = [];
  categories: any[] =  [];
  itemForm !: FormGroup;
  actionBtn : string = "Save";
  completed: boolean = false;

  constructor( private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogref : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.getCategories();

    this.itemForm = this.formBuilder.group({
      Name : ['', Validators.required],
      Category : ['', Validators.required],
      Quantity : ['', Validators.required],
      Price : ['', Validators.required],
      Notes : ['']
    })
    // console.log(this.editData);

    if(this.editData){
      console.log(this.editData);
      
      this.actionBtn = "Update";
      this.itemForm.controls['Name'].setValue(this.editData.Name);
      this.itemForm.controls['Quantity'].setValue(this.editData.Quantity);
      this.itemForm.controls['Price'].setValue(this.editData.Price);
      this.itemForm.controls['Notes'].setValue(this.editData.Notes);
    }

  }

  addProduct(){
    console.log(this.itemForm.value);
    if(!this.editData){
      if(this.itemForm.valid){
        this.api.postItem(this.itemForm.value)
        .subscribe({
          next:(res)=>{
            alert("Item added successfully!");
            this.itemForm.reset();
            this.dialogref.close('save');
          },
          error: ()=>{
            alert("Oops, something went wrong!")
          }
        })
      }
    } else{
      this.updateItem()
    }  
  }

  updateItem(){
    this.api.putItem(this.itemForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Item Updated successfully");
        this.itemForm.reset;
        this.dialogref.close('update');
      }, 
      error: ()=>{
        alert("Oops, something went wrong!");
      }
    })
  }

  

  getItemList(){
    this.api.getItem()
    .subscribe({
      next:(res)=>{
        this.itemList = res;
        console.log(this.itemList);
      }, complete:() =>{
        this.completed = true;
      }
    })
  }

  getCategories(){

    
    console.log(this.categories);
    this.api.getItem()
    .subscribe({
      next:(res)=>{
        //push item categories into array
        res.forEach((item: any) => {
          this.categories.push(item.Category)
        });
        //Filter array elements to remove duplicates and empty strings
        this.categories = [...new Set(this.categories)].filter((category: any) => category !== '');
        console.log(this.categories);
      }
    })
  }
  
}
