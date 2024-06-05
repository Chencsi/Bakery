import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DbService } from './db.service';
import { Item } from './types';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  public db: DbService;
  public error: any;
  public editId: string;
  public blur: boolean = false;
  public itemForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
    price: new FormControl("")
  })

  constructor() {
    this.db = inject(DbService);
  }

  editItem(item: Item): void {
    this.editId = item.id;
    this.itemForm.patchValue({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price.toString()
    })
    this.blur = true;
  }
  
  removeItem(item: Item): void {
    const id: string = item.id;
    this.db.removeItem(id);
  }
  
  updateItem(): void {
    const price: any = this.itemForm.value['price'];
    let parsed: number;
    try {
      parsed = Number(price)
      if (parsed > 0) {
        this.blur = false;
        this.db.updateItem(this.editId, this.itemForm.value)
      }
    } catch {
      this.error = "Price can only be a number!"
    }
  }

  closePanel(): void {
    this.blur = false;
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
}
