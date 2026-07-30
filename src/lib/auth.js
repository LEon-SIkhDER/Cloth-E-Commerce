import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import dns from "node:dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
const uri = process.env.MONGODB_URI




// if (!uri) {
//     throw new Error('MONGODB_URI IS MISSING')
// }




const client = new MongoClient(uri);
const db = client.db("Cloth_E_Commerce");
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    })
})
