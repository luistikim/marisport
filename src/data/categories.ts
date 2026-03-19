import { productGrid } from "@/data/product";
import type { CatalogProduct } from "@/data/product";

export type CatalogSection = {
  id: "feminino" | "masculino";
  title: string;
  description: string;
  products: CatalogProduct[];
};

export const categoryData = {
  feminine: {
    id: "feminino",
    title: "Feminino",
    description:
      "Conjuntos, tops e looks que unem estilo, sustentacao e conforto para o treino.",
  },
  masculine: {
    id: "masculino",
    title: "Masculino",
    description:
      "Camisetas, shorts e pecas funcionais para corrida, academia e rotina ativa.",
  },
} as const;

export const catalogSections: CatalogSection[] = [
  {
    ...categoryData.feminine,
    products: productGrid.filter((product) => product.category === "Feminino"),
  },
  {
    ...categoryData.masculine,
    products: productGrid.filter((product) => product.category === "Masculino"),
  },
];
