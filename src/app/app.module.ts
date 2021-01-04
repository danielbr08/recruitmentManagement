import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule, } from '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatButtonModule } from  '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';



import { NavbarComponent } from './navbar/navbar.component';
import { ManageCurrentTaskComponent } from './manage-current-task/manage-current-task.component';
import { EmergencyWarehouseUnitInventoryComponent } from './emergency-warehouse-unit-inventory/emergency-warehouse-unit-inventory.component';
import { AllocatePakalBattlionComponent } from './allocate-pakal-battlion/allocate-pakal-battlion.component';
import { AllocatePakalSquadComponent } from './allocate-pakal-squad/allocate-pakal-squad.component';
import { RecruitmentManagementComponent } from './recruitment-management/recruitment-management.component';
import { ReportsComponent } from './reports/reports.component';
import { NameListManagementComponent } from './manage/name-list-management/name-list-management.component';
import { TasksManagemententComponent } from './manage/tasks-managementent/tasks-managementent.component';
import { UsersManagemententComponent } from './manage/users-managementent/users-managementent.component';
import { PakalTypesManagemententComponent } from './manage/pakal-types-managementent/pakal-types-managementent.component';
import { SubUnitsManagementComponent } from './manage/sub-units-management/sub-units-management.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManageCurrentTaskComponent,
    EmergencyWarehouseUnitInventoryComponent,
    AllocatePakalBattlionComponent,
    AllocatePakalSquadComponent,
    RecruitmentManagementComponent,
    ReportsComponent,
    NameListManagementComponent,
    TasksManagemententComponent,
    UsersManagemententComponent,
    PakalTypesManagemententComponent,
    SubUnitsManagementComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
