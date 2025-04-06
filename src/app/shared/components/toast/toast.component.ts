import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastMessage, ToastType } from "@app/models/toast-message.interface";

@Component({
  selector: "app-toast",
  imports: [CommonModule],
  templateUrl: "./toast.component.html",
  styleUrl: "./toast.component.css",
})
export class ToastComponent {
  private nextId = 0;

  public toasts = signal<ToastMessage[]>([]);

  show(type: ToastType, message: string, duration: number = 3000): void {
    const id = this.nextId++;

    this.toasts.update((currentToasts) => [
      ...currentToasts,
      { id, type, message, duration },
    ]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show("success", message, duration);
  }

  error(message: string, duration?: number): void {
    this.show("error", message, duration);
  }

  warning(message: string, duration?: number): void {
    this.show("warning", message, duration);
  }

  info(message: string, duration?: number): void {
    this.show("info", message, duration);
  }

  remove(id: number): void {
    this.toasts.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }
}
