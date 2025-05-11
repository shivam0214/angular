import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  onSubmit(form: any): void {
    if (form.valid) {
      this.submitted = true;
      console.log('Form Data:', this.contact);
    }
  }
}
