import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';
import { ManageDeviceComponent } from './material-component/manage-device/manage-device.component';
import { managerGuard } from './helpers/manager.guard';
import { ClientChatComponent } from './client-chat/client-chat.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'userdashboard',
        component: UserDashboardComponent,
    },
    {
        path: 'manage-users',
        canActivate: [managerGuard],
        component: ManageUserComponent,
    },
    {
        path: 'manage-devices',
        canActivate: [managerGuard],
        component: ManageDeviceComponent,
    },
    {
        path: 'client-chat',
        component: ClientChatComponent,
    },
    {
        path: 'admin-chat',
        component: AdminChatComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
