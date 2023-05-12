export interface Cast {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

export interface Character {
  id: number;
  url: string;
  name: string;
  image: Image;
  _links: Links;
}

export interface Person {
  id: number;
  url: string;
  name: string;
  country: Country;
  birthday: string;
  deathday?: any;
  gender: string;
  image: Image;
  updated: number;
  _links: Links;
}

interface Links {
  self: Self;
}

interface Self {
  href: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}