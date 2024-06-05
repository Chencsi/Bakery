import { Component, inject } from '@angular/core';
import { ActionsService } from '../../actions.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public actions: ActionsService;

  constructor() {
    this.actions = inject(ActionsService);
  }
}
