// src/models/apiResponseTypes.ts

export interface ApiResponse {
  text: string;
  parsed: ParsedFood[];
  hints: FoodHint[];
  _links: { next: { title: string; href: string } };
}

export interface ParsedFood {
  food: FoodItem;
}

export interface FoodHint {
  food: FoodItem;
  measures: Measure[];
}

export interface FoodItem {
  foodId: string;
  label: string;
  nutrients: Nutrients;
  category: string;
  categoryLabel: string;
  image?: string;
}

export interface Nutrients {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
  FIBTG: number;
}

export interface Measure {
  uri: string;
  label: string;
  weight: number;
  qualified?: Qualified[];
}

export interface Qualified {
  qualifiers: Qualifier[];
  weight: number;
}

export interface Qualifier {
  uri: string;
  label: string;
}
