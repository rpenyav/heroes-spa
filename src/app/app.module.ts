import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataDummyService } from './services/data-dummy.service';
import { SuperHeroesService } from './services/super-heroes.service';
import { LayoutComponent } from './layout/layout/layout.component';
import { ReusableButtonComponent } from './components/ui/reusable-button/reusable-button.component';
import { HeroCardComponent } from './components/list/hero-card/hero-card.component';
import { FilterPipe } from './pipes/filter-pipe';
import { DeleteComponent } from './components/delete/delete.component';
import { LoaderSpinnerComponent } from './components/ui/loader-spinner/loader-spinner.component';
import { AddImageComponent } from './components/add/add-image/add-image.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from './material.module';
import { LoaderInterceptor } from './interceptor/loader-interceptor';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    AddComponent,
    EditComponent,
    LayoutComponent,
    ReusableButtonComponent,
    HeroCardComponent,
    FilterPipe,
    CapitalizePipe,
    DeleteComponent,
    LoaderSpinnerComponent,
    AddImageComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    InMemoryWebApiModule.forRoot(DataDummyService, { delay: 0 }),
    FormsModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [
    DataDummyService,
    SuperHeroesService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  exports: [ReusableButtonComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
