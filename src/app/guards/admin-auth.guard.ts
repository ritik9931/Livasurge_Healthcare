import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');

  console.log('Guard checking storage value:', isLoggedIn);

  // Use simple truthy check or explicit string check
  if (isLoggedIn === 'true') {
    return true;
  }

  console.error('Guard blocked navigation: Value was', isLoggedIn);
  return router.createUrlTree(['/login']);
};
