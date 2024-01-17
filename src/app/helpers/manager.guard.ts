import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const managerGuard: CanActivateFn = (route, state) => {
  var routerInstance = inject(Router);

  return inject(UserService).currentUser$.pipe(
    map((loggedInUser) => {
      const role = loggedInUser!.role;
      var userId= loggedInUser== null ? 0 : loggedInUser.userId;
      localStorage.setItem("userId",userId.toString());
      console.log(role)
      console.log(userId)
      

      if(role == "Admin"){
        return true;
      }

      routerInstance.navigateByUrl("/userdashboard")
      return false;
    })
  )
};
