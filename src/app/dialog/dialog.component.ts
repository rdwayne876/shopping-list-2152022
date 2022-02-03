import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  itemForm !: FormGroup;
  actionBtn : string = "Save";

  constructor( private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogref : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName : ['', Validators.required],
      itemQuantity : ['', Validators.required],
      itemPrice : ['', Validators.required],
      itemNotes : ['']
    })
    // console.log(this.editData);

    if(this.editData){
      this.actionBtn = "Update";
      this.itemForm.controls['itemName'].setValue(this.editData.itemName);
      this.itemForm.controls['itemQuantity'].setValue(this.editData.itemQuantity);
      this.itemForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.itemForm.controls['itemNotes'].setValue(this.editData.itemNotes);
    }

  }

  addProduct(){
    // console.log(this.itemForm.value);
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
  
}
