import { TestBed } from '@angular/core/testing';
import { DataDummyService } from './data-dummy.service';

describe('DataDummyService', () => {
  let service: DataDummyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDummyService],
    });
    service = TestBed.inject(DataDummyService);

    service.updateAllData([
      {
        id: 1,
        name: 'Magneto',
        originalname: 'Erik Lehnsherr',
        description:
          'A powerful mutant terrorist with the ability to generate and control mental magnetic fields',
        strength: 12,
        class: 'evil',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697655859/xmen/cshjx4a2pwmspzawlhn0.jpg',
        powers: [
          {
            name: 'Mental Magnetic Fields',
            description: 'Control mental magnetic fields',
          },
          {
            name: 'Magnetic Manipulation',
            description: 'Manipulate metal objects using magnetism',
          },
        ],
      },
    ]);

    localStorage.clear();
  });

  it('should have initial elements per page as 8', () => {
    expect(service.elementsPerPage).toEqual(8);
  });

  it('should have initial total elements as 20', () => {
    expect(service['totalElements']).toEqual(20);
  });

  it('should return correct total pages', () => {
    expect(service.getTotalPages()).toEqual(3);
  });

  it('should update hero by id', () => {
    const heroId = 1;
    const updatedHero = { id: 1, name: 'Updated Hero' };

    console.log('Before update: ', service.getAllData());
    service.updateHero(heroId, updatedHero);
    console.log('After update: ', service.getAllData());

    const allData = service.getAllData();
    const updatedHeroInData = allData.find((hero) => hero.id === heroId);
    expect(updatedHeroInData).toEqual(updatedHero);
  });

  it('should delete hero by id', () => {
    const heroId = 1;
    service.deleteHero(heroId);
    const allData = service.getAllData();
    const deletedHeroInData = allData.find((hero) => hero.id === heroId);
    expect(deletedHeroInData).toBeUndefined();
  });
});
