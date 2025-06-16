import { PrismaClient } from "@/generated/prisma";
import { ProductProps } from "@/models/product.model";
import { prisma } from "@/utils/prisma.util";
import { BuyOutputDTO, CreateOutputDTO, ListOutputDTO, SellOutputDTO } from "../product.service";

export async function Create(
  model_CreateProduct: (name: string, price: number) => ProductProps,
  repository_Save: (prisma: PrismaClient, product: ProductProps) => Promise<void>,
  name: string,
  price: number
): Promise<CreateOutputDTO> {
  if (!name || !price) throw new Error("Something missing.");

  const aProduct = model_CreateProduct(name, price);

  await repository_Save(prisma, aProduct);

  const output: CreateOutputDTO = {
    id: aProduct.id,
    balance: aProduct.quantity,
  };
  return output;
}

export async function List(repository_List: (prisma: PrismaClient) => Promise<ProductProps[]>): Promise<ListOutputDTO> {
  const allProducts = await repository_List(prisma);

  const products: ListOutputDTO = {
    products: allProducts,
  };

  return products;
}

export async function Buy(
  repository_Find: (prisma: PrismaClient, id: string) => Promise<ProductProps | null>,
  repository_Update: (prisma: PrismaClient, product: ProductProps) => Promise<void>,
  model_IncreaseStock: (product: ProductProps, amount: number) => ProductProps,
  id: string,
  amount: number
): Promise<BuyOutputDTO> {
  if (!id || !amount) throw new Error("Something missing.");
  const aProduct = await repository_Find(prisma, id);
  if (!aProduct) throw new Error("Product not found.");

  const updatedProduct = model_IncreaseStock(aProduct, amount);

  await repository_Update(prisma, updatedProduct);
  const output = {
    id: updatedProduct.id,
    balance: updatedProduct.quantity,
  };
  return output;
}

export async function Sell(
  repository_Find: (prisma: PrismaClient, id: string) => Promise<ProductProps | null>,
  repository_Update: (prisma: PrismaClient, product: ProductProps, amount: number) => Promise<void>,
  model_DecreaseStock: (product: ProductProps, amount: number) => ProductProps,
  id: string,
  amount: number
): Promise<BuyOutputDTO> {
  if (!id || !amount) throw new Error("Something missing.");

  const aProduct = await repository_Find(prisma, id);
  if (!aProduct) throw new Error("Product not found.");

  const updatedProduct = model_DecreaseStock(aProduct, amount);

  await repository_Update(prisma, updatedProduct, amount);

  const output: SellOutputDTO = {
    id: updatedProduct.id,
    balance: updatedProduct.quantity,
  };
  return output;
}
