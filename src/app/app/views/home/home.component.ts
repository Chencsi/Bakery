import { Component, inject } from '@angular/core';
import { DbService } from '../../../db.service';
import { CommonModule } from '@angular/common';
import { ActionsService } from '../../../actions.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public db: DbService;
  public actions: ActionsService;
  
  constructor() {
    this.db = inject(DbService);
    this.actions = inject(ActionsService);
  }
}
