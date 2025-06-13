import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { API } from "./api";

export class Program implements API {
  private constructor(readonly app: FastifyInstance) {}

  public static build(): Program {
    const app: FastifyInstance = Fastify({ logger: true });
    return new Program(app);
  }
  public addGetRoute(
    path: string,
    handle: (req: FastifyRequest, reply: FastifyReply) => Promise<FastifyReply>
  ): void {
    this.app.get(path, handle);
  }
  public addPostRoute(
    path: string,
    handle: (req: FastifyRequest, reply: FastifyReply) => Promise<FastifyReply>
  ): void {
    this.app.post(path, handle);
  }
  public start(port: number): void {
    this.app.listen({ port }).catch((err) => {
      this.app.log.error(err);
      process.exit(1);
    });
  }
  public printRoutes(): string {
    return this.app.printRoutes();
  }
}
