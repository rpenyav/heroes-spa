import { Injectable, inject } from '@angular/core';
import { DataDummyService } from './data-dummy.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { generateUniqueId } from '../helpers/generate-unique-id';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  private selectedSuperHeroIdSource = new BehaviorSubject<number | null>(null);
  selectedSuperHeroId$ = this.selectedSuperHeroIdSource.asObservable();
  private changesDetailSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  detailChanges$: Observable<boolean> =
    this.changesDetailSubject.asObservable();

  dataUpdatedSource = new BehaviorSubject<boolean>(false);
  dataUpdated$ = this.dataUpdatedSource.asObservable();

  constructor(private dataService: DataDummyService) {}
  router = inject(Router);
  getTotalPages(): number {
    return this.dataService.getTotalPages();
  }

  getElementsPerPage(): number {
    return this.dataService.elementsPerPage;
  }

  getAllSuperHeroes(): any[] {
    let allData = this.dataService.getAllData();
    allData = allData.sort((a, b) => a.id - b.id);
    return allData.reverse();
  }

  getHeroeById(id: number): any {
    let allData = this.dataService.getAllData();
    let heroe = allData.find((hero) => hero.id === id);
    return heroe;
  }

  savePowers(powers: any[]) {
    localStorage.setItem('powers', JSON.stringify(powers));
  }

  loadPowers(): Observable<any[]> {
    const powersStr = localStorage.getItem('powers');
    const powers = powersStr ? JSON.parse(powersStr) : [];
    return of(powers);
  }

  clearPowers() {
    localStorage.removeItem('powers');
  }

  setSelectedSuperHeroId(id: number | null) {
    this.selectedSuperHeroIdSource.next(id);
  }

  // notificarCambiosEnDetalle(cambios: boolean) {
  //   this.changesDetailSubject.next(cambios);
  // }

  addSuperheroe(newHero: any) {
    newHero.id = generateUniqueId();

    const allData = this.dataService.getAllData();
    allData.unshift(newHero);

    this.updateAllData(allData);
    this.dataUpdatedSource.next(true);
  }

  updateAllData(newData: any[]) {
    this.dataService.updateAllData(newData);
    this.dataUpdatedSource.next(true);
  }

  updateHeroeById(id: number, updatedHero: any): boolean {
    const index = this.dataService
      .getAllData()
      .findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.dataService.updateHero(id, updatedHero);
      return true;
    }
    return false;
  }

  updateSuperHeroImage(heroId: number, imageUrl: string) {
    const heroIndex = this.dataService
      .getAllData()
      .findIndex((hero) => hero.id === heroId);

    if (heroIndex !== -1) {
      this.dataService.getAllData()[heroIndex].picture = imageUrl;

      this.updateAllData(this.dataService.getAllData());
    }
  }

  deleteHeroeById(id: number): boolean {
    const allData = this.dataService.getAllData();
    const index = allData.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      allData.splice(index, 1);
      this.updateAllData(allData);
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }
}
