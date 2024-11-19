import { Injectable } from '@angular/core';
import { Observable,from, mergeMap } from 'rxjs';
import { AuthenticationService } from '../services/autenticacao/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}


  canActivate(): Observable<boolean> {

		return from(this.authenticationService.checkAuthentication())
		.pipe(mergeMap(isAuthenticated => {

			return new Observable<boolean>(observer => {
				if(!isAuthenticated) this.router.navigateByUrl('/login');
				observer.next(isAuthenticated)
			})
			}
		));
	}

}
