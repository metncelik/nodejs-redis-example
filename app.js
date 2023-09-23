import { RedisClient } from "./redisClient.js";
import { config } from "dotenv";

config()
const REDIS_URL = process.env.REDIS_URL

const redisClient = new RedisClient()
await redisClient.start(REDIS_URL)


const userId = "user-1"
const userData = {
    name: "meto", 
    admin: "true"
}
const TTL = 5

await redisClient.setValue(userId, userData, TTL)

while (true) {
    const user = await redisClient.getValue(userId)
    if (!user) {
        break
    }
    console.log(user)
    const ttl = await redisClient.getTTL(userId)
    console.log(ttl)
}

console.log("deleted")