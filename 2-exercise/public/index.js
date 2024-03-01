const todoInput = document.querySelector('#input-todo');
const todos = []

async function getTodos() {
    try {
        const response = await fetch('/api/todos');
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()

        todos.length = 0;
        
        data.forEach(todo => todos.push(todo))
        
        todoList()
        
        console.log(data)
    } 
    catch (error) {
    console.error('Error:', error);
    }
}

getTodos();

const todoList = () => {

    const todoContainer = document.querySelector("#todo-container")
    todoContainer.innerHTML = ''

    todos.forEach(todo => {

        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');

        const titleElement = document.createElement('div');
        titleElement.classList.add('todo-title');
        titleElement.textContent = todo.title; 

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('del-btn');
        buttonElement.textContent = 'X';
        buttonElement.addEventListener('click', () => deleteTodo(todo.id))

        todoElement.appendChild(titleElement);
        todoElement.appendChild(buttonElement);

        todoContainer.appendChild(todoElement);
    });

    return todoContainer
}

const addTodo = async() => {
    const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: todoInput.value
        })
    })

    if(res.status !== 201){
        console.log("something went wrong", res.status)
        return
    }
    
    const data = await res.json()

    todos.push(data)

    getTodos()
}

const form = document.querySelector('#add-todo-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if(todoInput === '') return

    await addTodo({
        todo: todoInput.value
    })

    todoList()

    form.reset()
})

const deleteTodo = async (id) => {
    try {
        const res = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json()

        console.log(data)

        getTodos()

    } catch (error) {
        console.error('Error:', error);
    }
    
}