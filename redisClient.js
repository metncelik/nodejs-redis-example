import {createClient} from 'redis'

export class RedisClient {
    constructer(url) {
        this.client;
    }

    async start(url) {
        this.client = createClient({url: url})
        this.client.on('error', error => console.log(error))
        await this.client.connect()
    }
    
    async setValue(key, hash, ttl) {
        await this.client.hSet(key, hash)
        await this.client.expire(key, ttl)
    }

    async getValue(key) {
        const exists = await this.client.exists([key])
        if (!exists) {
            return null
        }
        const object = await this.client.hGetAll(key)
        return object
    }

    async getTTL(key){
        return await this.client.ttl(key)
    }
}