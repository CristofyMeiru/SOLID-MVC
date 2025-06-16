import * as Model from "@/models/product.model";
import * as Repository from "@/repositories/product/prisma/product.repository.prisma";
import * as ProductService from "@/services/implementation/product.service.implementation";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Create(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { name, price } = req.body as { name: string; price: number };

    const output = ProductService.Create(Model.Create, Repository.Save, name, price);

    return reply.status(201).send({ message: "Product added succesfully." });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

export async function List(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { products } = await ProductService.List(Repository.List);

    return reply.status(200).send({ products });
  } catch (error) {
    return reply.status(400).send({ message: "Something went wrong." });
  }
}

export async function Buy(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { id } = req.params as { id: string };
    const { amount } = req.body as { amount: number };

    const output = await ProductService.Buy(Repository.Find, Repository.Update, Model.IncreaseStock, id, amount);

    return reply.status(200).send({ message: "Purchase completed succesfully.", output });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

export async function Sell(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { id } = req.params as { id: string };
    const { amount } = req.body as { amount: number };

    const output = await ProductService.Sell(Repository.Find, Repository.Update, Model.DecreaseStock, id, amount);

    return reply.status(200).send({ message: "Product sold succesfully.", output });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
