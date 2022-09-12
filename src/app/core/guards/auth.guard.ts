import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem("isConnected") == "true") {
      return true;
    } else {
        this.router.navigate(['/auth/connexion-component']);
        window.alert("Créer votre compte avant de pouvoir accéder à la liste des matchs !");
        return false;
      }
    }
}
