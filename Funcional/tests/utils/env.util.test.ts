import { GetEnv } from "@/utils/getEnv";
import { beforeAll, describe, expect, it } from "vitest";

describe("Environment Getter", ()=> {
    let port: number;
    beforeAll(()=> {
        port = Number(GetEnv("PORT"));
    })
    it("Port must be 3000", ()=> {
        expect(port).toBe(3000)
    } )
})