import { FastifyInstance } from "fastify";
import * as ProductController from '@/controllers/service.controller'

export default function productRoutes(instance: FastifyInstance){

    instance.get("/list", ProductController.List)

    instance.post("/create", ProductController.Create)
    instance.post('/:id/buy', ProductController.Buy)
    instance.post("/:id/sell", ProductController.Sell)
}