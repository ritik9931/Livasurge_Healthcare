import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutUsComponent } from './pages/about-us/about-us';
import { AppointmentComponent } from './pages/appointment/appointment';
import { ContactUsComponent } from './pages/contact-us/contact-us';
import { Doctors } from './pages/doctors/doctors';
import { Login } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { Contact } from './admin/contact/contact';
import { adminAuthGuard } from './guards/admin-auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'doctors', component: Doctors },
  { path: 'login', component: Login },

  {
    path: 'admin/dashboard',
    component: Dashboard,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'admin/contact',
    component: Contact,
    canActivate: [adminAuthGuard]
  },
 { path: '**', redirectTo: '', pathMatch: 'full' } 
];
