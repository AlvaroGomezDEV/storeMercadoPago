import { Injectable, ApplicationRef, createComponent } from "@angular/core";
import { ToastComponent } from "../components/toast/toast.component";
import { ToastType } from "@app/models/toast-message.interface";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastComponentRef: any;

  constructor(private appRef: ApplicationRef) {}

  private ensureComponentExists(): void {
    if (!this.toastComponentRef) {
      this.toastComponentRef = createComponent(ToastComponent, {
        environmentInjector: this.appRef.injector,
      });

      this.appRef.attachView(this.toastComponentRef.hostView);
      document.body.appendChild(this.toastComponentRef.location.nativeElement);
    }
  }

  show(type: ToastType, message: string, duration?: number): void {
    this.ensureComponentExists();
    this.toastComponentRef.instance.show(type, message, duration);
  }

  success(message: string, duration?: number): void {
    this.ensureComponentExists();
    this.toastComponentRef.instance.success(message, duration);
  }

  error(message: string, duration?: number): void {
    this.ensureComponentExists();
    this.toastComponentRef.instance.error(message, duration);
  }

  warning(message: string, duration?: number): void {
    this.ensureComponentExists();
    this.toastComponentRef.instance.warning(message, duration);
  }

  info(message: string, duration?: number): void {
    this.ensureComponentExists();
    this.toastComponentRef.instance.info(message, duration);
  }
}
