export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  inStock: boolean;
  pricePerSqm?: boolean;
}
