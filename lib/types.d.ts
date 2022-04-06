export interface Character {
  age?: Int;
  cartoons: String[];
  id: ID;
  name: String;
}

export type Int = number;

export type ID = string;