import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { app, InitServer } from '@/main'
import { AddressInfo } from 'net'

describe("Fastify instance", ()=> {
    beforeAll(async ()=> {
        await InitServer()
    })
    afterAll(()=> app.close())

    it("Instance must be initialized", async ()=> {
        const isRunning: null | string | AddressInfo = app.server.address() 
        console.log(isRunning)
        
        expect(isRunning).not.toBeNull();
        expect(isRunning).not.toBeUndefined();
    })

})