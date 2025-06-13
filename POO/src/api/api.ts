import { Program } from "./api.fastify";

export interface API {
    start: (port: number)=> void;
    
}