import { Product } from "@/generated/prisma";
import * as ProductModel from "@/models/product.model";
import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";

// Create
describe("Create an object with Product Props", () => {
  let product: Product;
  beforeAll(() => {
    product = ProductModel.Create("Produto 1", 100);
  });

  it("Product must be created.", () => {
    expectTypeOf(product).toMatchObjectType<Product>();
  });
});

// Increase stock
describe("Increase the stock of a product", () => {
  const product: Product = {
    id: "1A", name: "Produto 2",
    price: 100, quantity: 20,
  };
  let productWithNewStock: Product;
  beforeAll(()=> {
     productWithNewStock = ProductModel.IncreaseStock(product, 10)
  })

  it("Stock must be increased.", ()=> {
    expect(product.quantity).toBeLessThan(productWithNewStock.quantity);
  })
});

// Sell
describe("Sell the stock of a product.", ()=> {
    const product: Product = {
      id: "1Z", name: "Produto 3",
      price: 200, quantity: 20,
    };
    let productAfterSell: Product;

    beforeAll(()=> {
        productAfterSell = ProductModel.Sell(product, 10)
    })
    
    it("Stock must be decreased.", ()=> {
        expect(productAfterSell.quantity).toBeLessThan(product.quantity)
    })

    // Error test in case of quantity less than amount
    it("Error trigger in the sell function must be activated.", ()=> {
        expect(() => ProductModel.Sell(product, 30)).toThrowError(
          "Insufficient stock"
        );
    })
    
})