import { PrismaClient } from "@/generated/prisma";
import { ProductProps } from "@/models/product.model";

export type CreateOutputDTO = {
  id: string;
  balance: number;
};
export type ListOutputDTO = {
  products: { id: string; name: string; price: number; quantity: number }[];
};

export type BuyOutputDTO = {
  id: string;
  balance: number;
};

export type SellOutputDTO = {
  id: string;
  balance: number;
}

interface ProductService {
  Create: (
    model_CreateProduct: (name: string, price: number) => ProductProps,
    repository_Save: (prisma: PrismaClient, product: ProductProps) => Promise<void>,
    name: string,
    price: number
  ) => Promise<CreateOutputDTO>;

  List: (repository_List: (prisma: PrismaClient) => Promise<ProductProps[]>) => Promise<ListOutputDTO>;

  Buy: (
    repository_Find: (prisma: PrismaClient, id: string) => Promise<ProductProps | null>,
    repository_Update: (prisma: PrismaClient, product: ProductProps) => Promise<void>,
    model_IncreaseStock: (product: ProductProps, amount: number) => ProductProps,
    id: string,
    amount: number
  ) => Promise<BuyOutputDTO>;

  Sell: (
    repository_Find: (prisma: PrismaClient, id: string) => Promise<ProductProps | null>,
    repository_Update: (prisma: PrismaClient, product: ProductProps, amount: number) => Promise<void>,
    model_DecreaseStock: (product: ProductProps, amount: number) => ProductProps,
    id: string,
    amount: number
  ) => Promise<SellOutputDTO>;
}
