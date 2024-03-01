const express = require('express')
const path = require('path')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const prisma = new PrismaClient()

const PORT = process.env.PORT || 9999
app.listen(PORT, () => console.log("server is running on: http://localhost:" + PORT))

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/api/todos', async(req, res) => {
    const { title } = req.body

    if(!title) {
        res.status(400).json({message: "please enter a todo"})
    }

    const todo = await prisma.todo.create({data: { title }})

    res.status(201).json(todo)
})

app.delete('/api/todos/:id', async(req, res) => {
    const { id } = req.params;

    try {
        await prisma.todo.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({ success: true, message: 'Todo deleted successfully' })

    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete todo' })
    }
})