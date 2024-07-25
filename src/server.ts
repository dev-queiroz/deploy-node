import fastify from "fastify";
import { supabase } from "./supabaseConnection";

const app = fastify();

type users = {
    id: string;
    name: string,
    email: string
}

app.get("/users", async (req, res) => {
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

app.put("/users/:id", async (req, res) => {
    try{
        const { id } = req.params as users
        const { name, email } = req.body as users
        const { data: updatedUser } = await supabase.from('users').update([{
            name,
            email
        }]).eq('id', id).select()

        return {
            value: updatedUser ? updatedUser[0] : null
        }
    } catch (error) {
        console.log(error)
    }
});

app.delete("/users/:id", async (req, res) => {
    try{
        const { id } = req.params as users
        const { data: deletedUser } = await supabase.from('users').delete().eq('id', id).select()
        
        return {
            value: deletedUser ? deletedUser[0] : null
        }
    } catch (error) {
        console.log(error)
    }
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=> {
    console.log('Server is running on port 3333')
})
