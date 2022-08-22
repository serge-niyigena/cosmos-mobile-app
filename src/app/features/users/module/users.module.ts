import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from '../page/user-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    IonicModule
  ],
  declarations: [UserListComponent]
})
export class UsersModule { }
