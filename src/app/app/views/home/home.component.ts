import { Component, inject } from '@angular/core';
import { DbService } from '../../../db.service';
import { Item } from '../../../types';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public editingItem: Item;
  public blur: boolean = false;
  public db: DbService;
  
  constructor() {
    this.db = inject(DbService);
  }
  
  editItem(item: Item): void {
    this.editingItem = item;
    this.blur = true;
  }
  
  removeItem(item: Item): void {
    const id: string = item.id;
    this.db.removeItem(id);
  }
  
  saveItem(): void {
    this.blur = false;
    console.log(this.editingItem)
  }
}
