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
    this.blur = false;
    this.db.updateItem(this.editId, this.itemForm.value)
  }
}
