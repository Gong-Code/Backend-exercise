const express = require('express')
const path = require('path')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const prisma = new PrismaClient()

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

const PORT = process.env.PORT || 9999

app.listen(PORT, () => console.log("server is running on: http://localhost:" + PORT))