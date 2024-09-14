export interface ProductType {
  id: string;
  categories_id: string;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  favourite: boolean;
  description: string;
}

export interface CategoryType {
  id: string;
  name: string;
  image: string;
}

export interface Color {
  id: string;
  name: string;
  bgColor: string;
  stock: boolean;
}

export interface Size {
  id: string;
  name: string;
  stock: boolean;
}

export interface Sample {
  key: number;
  image: string;
}
