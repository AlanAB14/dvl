import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../../services/contacts.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent {
  loaderService = inject(LoaderService);
  contactService = inject(ContactsService);
  fb = inject(FormBuilder);
  contactFrom = this.fb.group({
    name: ['', Validators.required],
    country: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]],
    company: ['', Validators.required],
    message: ['', Validators.required]
  });

  sendData() {
    console.log(this.contactFrom.value)
    if (this.contactFrom.invalid) {
      return
    }
    this.createContact(this.contactFrom.value);
  }

  createContact(contact: any) {
    this.loaderService.setLoader(true);
    this.contactService.createContact(contact)
      .subscribe(resp => {
        this.loaderService.setLoader(false);
        Swal.fire('Solicitud enviada con éxito', '', 'success');
      }, (error) => {
        console.log(error);
        this.loaderService.setLoader(false);
        Swal.fire('Ocurrió un error al enviar la solicitud', '', 'error');
      })
  }

}
