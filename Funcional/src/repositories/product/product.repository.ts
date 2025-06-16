import { PrismaClient } from "@/generated/prisma";
import { ProductProps } from "@/models/product.model";

interface ProductRepository {
  Save: (prisma: PrismaClient, product: ProductProps) => Promise<void>;
  List: (prisma: PrismaClient) => Promise<ProductProps[]>;
  Update: (prisma: PrismaClient, product: ProductProps) => Promise<void>;
  Find: (prisma: PrismaClient, id: string)=> Promise<ProductProps | null>;
}
