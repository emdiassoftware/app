import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/autenticacao/authentication.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';



import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  errorMsg:string=""
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
    private authenticationService:AuthenticationService,
    private storageService:UsuarioStorageService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(110),
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        ])),
      termsconditions: new FormControl(true,Validators.requiredTrue),

      error:new FormControl('')
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'E-mail inválido' },
    ],
    'password': [
        { type: 'required', message: 'Preencha o campo senha' }
    ],
    'termsconditions': [
      { type: 'required', message: 'Aceite os termos de uso do aplicativo' }
    ]
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  async onSubmit()
  {


    this.isSubmitted = true;

    if(! this.loginForm.valid) return;

    const resp = await this.authenticationService.login(this.loginForm.value);

    if(resp==='credenciaisInvalidas') {
      this.errorMsg='Credenciais Inválidas';
    } else {
      this.router.navigateByUrl('/tabs/home')
    }





  }



}
