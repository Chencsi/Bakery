import { Component, inject } from '@angular/core';
import { DbService } from '../../../db.service';
import { Item } from '../../../types';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public itemForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
    price: new FormControl("")
  })
  public error: any;
  public editId: string;
  public blur: boolean = false;
  public db: DbService;
  
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

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
}
