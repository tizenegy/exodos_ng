import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { MiniMapComponent } from './sidebar/mini-map/mini-map.component';
import { MainControlsComponent } from './sidebar/main-controls/main-controls.component';
import { MainInfoComponent } from './sidebar/main-info/main-info.component';
import { ActiveUnitComponent } from './sidebar/active-unit/active-unit.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainWindowComponent,
    MiniMapComponent,
    MainControlsComponent,
    MainInfoComponent,
    ActiveUnitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
