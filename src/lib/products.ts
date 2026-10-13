import { Product } from "@/types/product";
import data from "../../data/products.json";

// Data access layer — swap this to Prisma/DB calls when ready

export async function getProducts(): Promise<Product[]> {
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return (data as Product[]).find((p) => p.id === id);
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set((data as Product[]).map((p) => p.category));
  return Array.from(categories).sort();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return (data as Product[]).filter((p) => p.category === category);
}
