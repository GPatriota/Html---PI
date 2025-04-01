import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal">
        <h3>Confirmar exclusão</h3>
        <p>Você tem certeza que quer deletar esse produto?</p>
        <div class="button-group">
          <button class="confirm-btn" (click)="confirm()">Sim</button>
          <button class="cancel-btn" (click)="cancel()">Não</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      text-align: center;
    }
    h3 {
      margin-bottom: 1rem;
      color: #2c5282;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
    }
    button {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    .confirm-btn {
      background: #e53e3e;
      color: white;
    }
    .confirm-btn:hover {
      background: #c53030;
    }
    .cancel-btn {
      background: #e2e8f0;
      color: #4a5568;
    }
    .cancel-btn:hover {
      background: #cbd5e0;
    }
  `]
})
export class DeleteModalComponent {
  @Input() isOpen = false;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}