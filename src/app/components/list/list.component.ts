import { Component, OnInit } from '@angular/core';
import { XMenCharacter } from '../../model/characters';
import { SuperHeroesService } from '../../services/super-heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  superheroes: XMenCharacter[] = [];
  actualPage = 1;
  totalPages: number;
  search: string = '';

  constructor(private superHeroesService: SuperHeroesService) {
    this.totalPages = this.superHeroesService.getTotalPages();
  }

  ngOnInit(): void {
    this.loadData();
    this.superHeroesService.dataUpdated$.subscribe((updated) => {
      if (updated) {
        this.loadData();
      }
    });
  }

  onSearchChange(): void {
    this.actualPage = 1;
    this.loadData();
  }

  loadData(resetPage: boolean = false): void {
    if (resetPage) {
      this.actualPage = 1;
    }

    let allSuperHeroes = this.superHeroesService.getAllSuperHeroes();

    if (this.search) {
      allSuperHeroes = allSuperHeroes.filter((hero) =>
        hero.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    this.totalPages = Math.ceil(
      allSuperHeroes.length / this.superHeroesService.getElementsPerPage()
    );

    const initial =
      (this.actualPage - 1) * this.superHeroesService.getElementsPerPage();
    const end = initial + this.superHeroesService.getElementsPerPage();
    this.superheroes = allSuperHeroes.slice(initial, end);
  }

  nextPage(): void {
    if (this.actualPage < this.totalPages) {
      this.actualPage++;
      this.loadData();
    }
  }

  previousPage(): void {
    if (this.actualPage > 1) {
      this.actualPage--;
      this.loadData();
    }
  }
}
