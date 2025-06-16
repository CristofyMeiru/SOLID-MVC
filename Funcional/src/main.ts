import Fastify, { FastifyInstance } from "fastify";
import { GetEnv } from "./utils/getEnv";
import productRoutes from "./routes/product.routes";

export const app: FastifyInstance = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

export async function InitServer(): Promise<void> {
  const port: number = Number(GetEnv("PORT"));

  app.register(productRoutes, {prefix: "/product"})

  try {
    await app.listen({ port });
    
  } catch (error) {
    app.log.error(error);
  }
}

InitServer()