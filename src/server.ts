import fastify from "fastify";
import { supabase } from "./supabaseConnection";

const app = fastify();

type users = {
    name: string,
    email: string
}

app.get("/users", async () => {
    try{
        const { data: users } = await supabase.from('users').select('*');
        return { value: users }
        } catch (error) {
            console.log(error)
    }
});

app.post("/users", async (req, res) => {
    try{
        const { name, email } = req.body as users
        const { data: createdUser } = await supabase.from('users').insert([{
            name,
            email
        }]).select()

        return {
            value: createdUser ? createdUser[0] : null
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=> {
    console.log('Server is running on port 3333')
})
