import { Component, inject } from '@angular/core';
import { ActionsService } from '../../actions.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  public actions: ActionsService;

  constructor() {
    this.actions = inject(ActionsService);
  }
}
