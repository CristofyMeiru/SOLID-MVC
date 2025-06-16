import { PrismaClient, Product } from "@/generated/prisma";
import { ProductProps } from "@/models/product.model";

export async function Save(
  prisma: PrismaClient,
  product: Product
): Promise<void> {
  try {
    const data: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await prisma.product.create({ data });
  } catch (error) {
    throw new Error("Error registering product.");
  }
}

export async function List(prisma: PrismaClient): Promise<ProductProps[]> {
  try {
    const allProducts = await prisma.product.findMany();

    return allProducts;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}

export async function Update(prisma: PrismaClient, product: ProductProps) {
  try {
    const data: ProductProps = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await prisma.product.update({ where: { id: product.id }, data });
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}

export async function Find(
  prisma: PrismaClient,
  id: string
): Promise<ProductProps | null> {
  const aProduct = await prisma.product.findUnique({ where: { id } });

  if (!aProduct) return null;

  return aProduct;
}

