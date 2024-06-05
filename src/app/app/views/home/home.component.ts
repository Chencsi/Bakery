import { Component, inject } from '@angular/core';
import { DbService } from '../../../db.service';
import { Item } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public db: DbService;
  
  constructor() {
    this.db = inject(DbService);
  }

  editItem(item: Item): void {
    const id: string = item.id;
    document.querySelector('#panel')?.classList.add('blur-lg');
  }
  removeItem(item: Item): void {
    const id: string = item.id;
    this.db.removeItem(id);
  }
}
