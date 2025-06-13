import { FastifyHttpOptions, FastifyInstance } from "fastify";
import { Program } from "./api/api.fastify";
import { ProductController } from "./api/controllers/product.controller";
import { getPortEnv } from "./utils/getEnv";
import { FastifyRouteConfig } from "fastify/types/route";

function main(){
    const api = Program.build();
    const port: number = getPortEnv()

    const controller = ProductController.build();

    api.addGetRoute("/products", controller.list)
    api.addPostRoute("/products/:id/buy", controller.buy)
    api.addPostRoute("/products/:id/sell", controller.sell)
    api.addPostRoute("/products/create", controller.create)

    console.log(api.printRoutes())

    api.start(port)
}

main();