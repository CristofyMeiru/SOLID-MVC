import dotenv from 'dotenv'
dotenv.config()

export function GetEnv(key: string){
    const value = process.env[key]
    if(!value){
        throw new Error("Env do not exist.")
    }
    return value;
}