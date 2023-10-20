export interface XMenCharacter {
  id: number;
  name: string;
  originalname: string;
  description: string;
  strength: number;
  class: string;
  picture: string;
  powers: Power[];
}

export interface Power {
  name: string;
  description: string;
}
