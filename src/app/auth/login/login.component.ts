import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
  ]
})
export default class LoginComponent {
  public spinnerUrl = '/assets/img/spinner.gif';
  public byPass = !environment.SingleSignOn;
  public mostrarLoader = false;
  public usuId = '';
  public password = '';
  cargando: boolean = false;
  
  constructor( private _authService: AuthService ) { }

  ngOnInit(): void {
    this._authService.loginResponse();
  }

  // goToByPass() {
  //   if (!this.byPass)
  //     return;

  //   if (!this.usuId) {
  //     this.mostrarLoader = false;
  //     return;
  //   }
  //   this.mostrarLoader = true;
  //   this._authService.byPass(this.usuId);
  // }

  login() {
    if (this.usuId && this.password) {
      this.cargando = true
      try {
        this._authService.loginUser(this.usuId, this.password)
          .subscribe( (data: any) => {
            this.cargando = false
            if(data.token) {
              this._authService.setCookie(data.token)
              this._authService.loginResponse();
              this.usuId = ''
              this.password = ''
            }
          },
          (error) => {
            console.log(error)
            Swal.fire('Ocurrió un error', `${ error.error.message }`, 'error')
            this.usuId = ''
            this.password = ''
            this.cargando = false
          })
      } catch (error) {
        Swal.fire('Ocurrió un error con la conexión', 'error')
      }
    }
  }
}
