import { Product, ProductProps } from "../../models/product.model";

export interface ProductRepository {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
    update(product: Product): Promise<void>;
    find(id: string): Promise<Product | null>;
}