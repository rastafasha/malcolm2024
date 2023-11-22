import { Component, OnInit } from '@angular/core';
import { CmspageService } from '../cmspage.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  model = new Contact();
  submitted = false;
  error: any = {};
  info: any = {};
  contactForm:FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cmspageService: CmspageService,
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.iniciarFormulario();
  }
  iniciarFormulario(){
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      status: new FormControl('PENDING', [Validators.required])
      })

  }
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.cmspageService.contactForm(this.contactForm.value).subscribe(
      (res:any) => {
        if (this.error) {
          Swal.fire('Error', this.error, 'error');
          // console.log(this.error)
        } else {
          Swal.fire('Enviado!', 'El email fue enviado', 'success');
          // this.router.navigate(['/']);
          this.ngOnInit();
        }
      },
      error => this.error = error
    );
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

}
