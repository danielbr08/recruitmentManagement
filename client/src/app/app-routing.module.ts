import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllocatePakalBattlionComponent } from './allocate-pakal-battlion/allocate-pakal-battlion.component';
import { AllocatePakalSquadComponent } from './allocate-pakal-squad/allocate-pakal-squad.component';
import { AppComponent } from './app.component';
import { EmergencyWarehouseUnitInventoryComponent } from './emergency-warehouse-unit-inventory/emergency-warehouse-unit-inventory.component';
import { NameListManagementComponent } from './manage/name-list-management/name-list-management.component';
import { NamesListSoldiersManagementComponent } from './manage/names-list-soldiers-management/names-list-soldiers-management.component';
import { PakalTypesManagemententComponent } from './manage/pakal-types-managementent/pakal-types-managementent.component';
import { SubUnitsManagementComponent } from './manage/sub-units-management/sub-units-management.component';
import { TasksManagemententComponent } from './manage/tasks-managementent/tasks-managementent.component';
import { UsersManagemententComponent } from './manage/users-managementent/users-managementent.component';
import { RecruitmentManagementComponent } from './recruitment-management/recruitment-management.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  // { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'manage-current-task/warehouse-unit-inventor', component: EmergencyWarehouseUnitInventoryComponent, pathMatch: 'full' },
  { path: 'manage-current-task/allocate-pakal-battlion', component: AllocatePakalBattlionComponent, pathMatch: 'full' },
  { path: 'manage-current-task/allocate-pakal-squad', component: AllocatePakalSquadComponent, pathMatch: 'full' },
  { path: 'manage-current-task/recruitment-management', component: RecruitmentManagementComponent, pathMatch: 'full' },
  { path: 'manage-current-task/reports', component: ReportsComponent, pathMatch: 'full' },

  { path: 'manage/names-list', component: NameListManagementComponent, pathMatch: 'full' },
  { path: 'manage/tasks', component: TasksManagemententComponent, pathMatch: 'full' },
  { path: 'manage/pakal-types', component: PakalTypesManagemententComponent, pathMatch: 'full' },
  { path: 'manage/users', component: UsersManagemententComponent, pathMatch: 'full' },
  { path: 'manage/sub-units', component: SubUnitsManagementComponent, pathMatch: 'full' },
  { path: 'manage/nameslist/:id', component: NamesListSoldiersManagementComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
