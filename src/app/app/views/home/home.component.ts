import { Component, inject } from '@angular/core';
import { DbService } from '../../../db.service';
import { Item } from '../../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public db: DbService;
  
  constructor() {
    this.db = inject(DbService);
  }

  editItem(item: Item): void {
    const id: number = item.id;
    document.querySelector('#panel')?.classList.add('blur-lg');
  }
  removeItem(item: Item): void {
    const id: number = item.id;
    this.db.removeItem(id);
  }
}
