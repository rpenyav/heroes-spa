import { InMemoryDbService } from 'angular-in-memory-web-api';
import { XMenCharacter } from '../model/characters';

export class DataDummyService implements InMemoryDbService {
  public elementsPerPage = 8;
  private totalElements = 20;
  private totalPages: number;
  private elements: XMenCharacter[];

  constructor() {
    this.elements = this.loadDataFromLocalStorageOrDefault();
    this.totalPages = this.getTotalPages();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalElements / this.elementsPerPage);
  }

  loadDataFromLocalStorageOrDefault(): XMenCharacter[] {
    const storedData = localStorage.getItem('elements');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const defaultData = this.getDefaultData();
      localStorage.setItem('elements', JSON.stringify(defaultData));
      return defaultData;
    }
  }

  /**
   *  INITIAL DATA
   * @returns
   */
  getDefaultData(): XMenCharacter[] {
    const elements = [
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
      {
        id: 2,
        name: 'X Professor',
        originalname: 'Charles Francis Xavier',
        description:
          'He is an exceptionally powerful telepath, who can read and control the minds of others.',
        strength: 12,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697656094/xmen/xcu36v42z3vpzgejxxgg.jpg',
        powers: [
          {
            name: 'Telepathy',
            description: 'Read and control the minds of others',
          },
        ],
      },
      {
        id: 3,
        name: 'Wolverine',
        originalname: 'Logan',
        description:
          'A mutant with enhanced physical capabilities, including rapid healing and retractable bone claws.',
        strength: 11,
        class: 'antihero',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697669079/xmen/kq9t5ib7nfcmvt4hpe6s.jpg',
        powers: [
          {
            name: 'Rapid Healing',
            description: 'Heal rapidly from injuries',
          },
          {
            name: 'Retractable Bone Claws',
            description: 'Extend and retract bone claws',
          },
        ],
      },
      {
        id: 4,
        name: 'Storm',
        originalname: 'Ororo Munroe',
        description:
          'A mutant with the power to manipulate the weather, creating storms and lightning.',
        strength: 10,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697659492/xmen/gd3aoe9tx17qj7nzls1n.webp',
        powers: [
          {
            name: 'Weather Manipulation',
            description: 'Control and manipulate the weather',
          },
        ],
      },
      {
        id: 5,
        name: 'Rogue',
        originalname: 'Anna Marie',
        description:
          'A mutant with the ability to absorb the powers and memories of others through touch.',
        strength: 9,
        class: 'antihero',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697659580/xmen/exbmgtwc7kgigblubthd.jpg',
        powers: [
          {
            name: 'Power Absorption',
            description: 'Absorb powers and memories of others',
          },
        ],
      },
      {
        id: 6,
        name: 'Cyclops',
        originalname: 'Scott Summers',
        description:
          'A mutant who emits powerful energy beams from his eyes, requiring special glasses to control them.',
        strength: 10,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697659627/xmen/kag5vmqckaue6itzdahp.jpg',
        powers: [
          {
            name: 'Optic Blast',
            description: 'Emit powerful energy beams from eyes',
          },
        ],
      },
      {
        id: 7,
        name: 'Sabretooth',
        originalname: 'Victor Creed',
        description:
          'A mutant with superhuman strength, agility, and razor-sharp claws, often an enemy of Wolverine.',
        strength: 11,
        class: 'evil',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/v1697659676/xmen/z8l4grjirrl8uai1u21q.jpg',
        powers: [
          {
            name: 'Superhuman Strength',
            description: 'Possess superhuman strength',
          },
          {
            name: 'Agility',
            description: 'Exceptional agility',
          },
          {
            name: 'Razor-Sharp Claws',
            description: 'Sharp claws for combat',
          },
        ],
      },
      {
        id: 8,
        name: 'Juggernaut',
        originalname: 'Cain Marko',
        description:
          'A virtually unstoppable mutant with superhuman strength and invulnerability.',
        strength: 12,
        class: 'evil',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697659735/xmen/mmiwkhuivc4xhssgm0yx.webp',
        powers: [
          {
            name: 'Superhuman Strength',
            description: 'Possess superhuman strength',
          },
          {
            name: 'Invulnerability',
            description: 'Nearly impossible to harm',
          },
        ],
      },
      {
        id: 9,
        name: 'Mystique',
        originalname: 'Raven Darkhölme',
        description:
          'A mutant with the ability to shape-shift and mimic the appearance and voice of others.',
        strength: 10,
        class: 'evil',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697659791/xmen/sh29oy32vtev8639h9zu.jpg',
        powers: [
          {
            name: 'Shape-Shifting',
            description: 'Mimic appearance and voice of others',
          },
        ],
      },
      {
        id: 10,
        name: 'Apocalypse',
        originalname: 'En Sabah Nur',
        description:
          'An ancient and powerful mutant with a variety of superhuman abilities and a desire for world domination.',
        strength: 13,
        class: 'evil',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697659842/xmen/ozfcww0pfqr869ht2fb0.jpg',
        powers: [
          {
            name: 'Superhuman Abilities',
            description: 'Possess various superhuman abilities',
          },
          {
            name: 'World Domination',
            description: 'Desire for global control',
          },
        ],
      },
      {
        id: 11,
        name: 'Jean Grey',
        originalname: 'Jean Grey',
        description:
          'A mutant with immense telepathic and telekinetic powers, known as the Phoenix.',
        strength: 11,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697820259/xmen/fpgf031znrna5pd3ql7o.jpg',
        powers: [
          {
            name: 'Telepathy',
            description: 'Read and control the minds of others',
          },
          {
            name: 'Telekinesis',
            description: 'Move objects with the mind',
          },
        ],
      },
      {
        id: 12,
        name: 'Gambit',
        originalname: 'Remy LeBeau',
        description:
          'A mutant with the ability to charge objects with kinetic energy and cause them to explode.',
        strength: 8,
        class: 'antihero',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697820574/xmen/sagnhksuxun3tunhhwpx.jpg',
        powers: [
          {
            name: 'Kinetic Energy Manipulation',
            description: 'Charge objects with kinetic energy',
          },
          {
            name: 'Explosive Cards',
            description: 'Cause charged objects to explode',
          },
        ],
      },
      {
        id: 13,
        name: 'Deadpool',
        originalname: 'Wade Wilson',
        description:
          'A mutant with a regenerative healing factor and exceptional combat skills, known for his humor.',
        strength: 9,
        class: 'antihero',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697820683/xmen/sb9ep8bgvszsfmnwj9qt.webp',
        powers: [
          {
            name: 'Regenerative Healing',
            description: 'Heal rapidly from injuries',
          },
          {
            name: 'Combat Skills',
            description: 'Exceptional hand-to-hand combat skills',
          },
          {
            name: 'Fourth Wall Awareness',
            description: 'Awareness of being a fictional character',
          },
        ],
      },
      {
        id: 14,
        name: 'Nightcrawler',
        originalname: 'Kurt Wagner',
        description:
          'A mutant with the ability to teleport and an acrobatic fighting style.',
        strength: 8,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697820750/xmen/iztx5paakszldmtlqksu.png',
        powers: [
          {
            name: 'Teleportation',
            description: 'Instantaneous travel from one place to another',
          },
          {
            name: 'Acrobatic Combat',
            description: 'Skilled in acrobatic fighting',
          },
        ],
      },
      {
        id: 15,
        name: 'Colossus',
        originalname: 'Piotr Rasputin',
        description:
          'A mutant with the ability to transform his body into organic steel, granting superhuman strength and durability.',
        strength: 11,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697820839/xmen/xaqsv0iwnu7c16wmb4hw.jpg',
        powers: [
          {
            name: 'Organic Steel Transformation',
            description: 'Transform body into organic steel',
          },
          {
            name: 'Superhuman Strength',
            description: 'Possess superhuman strength',
          },
          {
            name: 'Super Durability',
            description: 'High resistance to damage',
          },
        ],
      },
      {
        id: 16,
        name: 'Kitty Pryde',
        originalname: 'Katherine Pryde',
        description:
          'A mutant with the ability to phase through solid objects and disrupt electrical systems.',
        strength: 7,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697820930/xmen/mgddnjp1l09qblca9fmi.jpg',
        powers: [
          {
            name: 'Phasing',
            description: 'Phase through solid objects',
          },
          {
            name: 'Electrical Disruption',
            description: 'Disrupt electrical systems',
          },
        ],
      },
      {
        id: 17,
        name: 'Bishop',
        originalname: 'Lucas Bishop',
        description:
          'A mutant with the ability to absorb and release energy, often using futuristic weaponry.',
        strength: 9,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697820995/xmen/fqgocvacjgv6ifzy5npq.webp',
        powers: [
          {
            name: 'Energy Absorption',
            description: 'Absorb and release energy',
          },
          {
            name: 'Futuristic Weaponry',
            description: 'Utilize advanced weaponry from the future',
          },
        ],
      },
      {
        id: 18,
        name: 'Emma Frost',
        originalname: 'Emma Frost',
        description:
          'A mutant with telepathic abilities and the power to transform her body into diamond, granting enhanced strength and durability.',
        strength: 9,
        class: 'antihero',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697821090/xmen/gyjq8fpiqra3de51zh85.webp',
        powers: [
          {
            name: 'Telepathy',
            description: 'Read and control the minds of others',
          },
          {
            name: 'Diamond Form',
            description: 'Transform body into diamond',
          },
          {
            name: 'Enhanced Strength',
            description: 'Possess enhanced strength',
          },
          {
            name: 'Super Durability',
            description: 'High resistance to damage',
          },
        ],
      },
      {
        id: 19,
        name: 'Iceman',
        originalname: 'Bobby Drake',
        description:
          'A mutant with the ability to manipulate ice and freeze objects, creating ice constructs and weapons.',
        strength: 8,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697821195/xmen/ynagdpss0ruouqalxrcs.jpg',
        powers: [
          {
            name: 'Ice Manipulation',
            description: 'Manipulate ice and freeze objects',
          },
          {
            name: 'Ice Constructs',
            description: 'Create objects and weapons from ice',
          },
        ],
      },
      {
        id: 20,
        name: 'Beast',
        originalname: 'Hank McCoy',
        description:
          'A mutant with superhuman agility, strength, and an ape-like appearance, known for his intelligence.',
        strength: 10,
        class: 'good',
        picture:
          'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697821268/xmen/wfb1jyj3vo6awnhzrsxj.webp',
        powers: [
          {
            name: 'Superhuman Agility',
            description: 'Possess superhuman agility and reflexes',
          },
          {
            name: 'Superhuman Strength',
            description: 'Possess superhuman strength',
          },
          {
            name: 'Genius-Level Intelligence',
            description: 'Exceptional intelligence and scientific knowledge',
          },
        ],
      },
    ];
    return elements;
  }

  updateAllData(newData: any[]) {
    this.elements = newData.sort((a, b) => b.id - a.id);
    localStorage.setItem('elements', JSON.stringify(this.elements));
  }

  updateHero(id: number, updatedHero: any) {
    const index = this.elements.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.elements[index] = updatedHero;
      this.updateAllData(this.elements);
    }
  }

  deleteHero(id: number) {
    const index = this.elements.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.elements.splice(index, 1);
      this.updateAllData(this.elements);
    }
  }

  getAllData(): any[] {
    return this.elements;
  }

  createDb() {
    const pages: { [key: string]: any[] } = {};
    for (let page = 1; page <= this.totalPages; page++) {
      const initial = (page - 1) * this.elementsPerPage;
      const end = initial + this.elementsPerPage;
      const elementsByPage = this.elements.slice(initial, end);
      pages[`page${page}`] = elementsByPage;
    }
    return pages;
  }
}
