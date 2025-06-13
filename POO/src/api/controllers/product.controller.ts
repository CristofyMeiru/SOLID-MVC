import { CreateProductDTO } from "@/dto/controller/product/product.dto";
import { ProductRepositoryPrisma } from "@/repositories/product/prisma/product.repository.prisma";
import { ProductServiceImplementation } from "@/services/product/implementation/product.service.implementation";
import { BuyOutputDTO, SellOutputDTO } from "@/services/product/product.service";
import { prisma } from "@/utils/prisma.util";
import { FastifyReply, FastifyRequest } from "fastify";

export class ProductController {
  private constructor() {}

  public static build() {
    return new ProductController();
  }
  public async create(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { name, price } = req.body as CreateProductDTO;

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = aService.create(name, price);

    return reply.status(201).send({ message: "Produto criado com sucesso." });
  }

  public async list(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const { products } = await aService.list();

    return reply.status(200).send({ products });
  }

  public async buy(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params as { id: string };
    const { amount } = req.body as { amount: number };

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.buy(id, amount);

    const data: BuyOutputDTO = {
      id: output.id,
      balance: output.balance,
    };

    return reply.status(200).send({ data });
  }
  
  public async sell(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params as { id: string };
    const { amount } = req.body as { amount: number };

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.sell(id, amount)

    const data: SellOutputDTO = {
      id: output.id,
      balance: output.balance
    }

    return reply.status(200).send({data})
  }
}
