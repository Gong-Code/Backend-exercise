const todoItem = document.querySelector(".todo-item")
const todoInput = document.querySelector('#input-todo');
const todos = []



const getTodos = async() => {
    try {
        const res = await fetch('/api/todos')

        if(res.status !== 200){
            throw new Error("something went wrong")
        }

        const data = await res.json()
        data.array.forEach(todo => {
            todo.push(todos)
        });

        todoList()

        console.log(data)

    } catch (error) {
        console.log(error.message)
    }
}

getTodos()

const todoList = () => {
    todoItem.innerHTML = '';
    todos.forEach(todo => {
        todoItem.innerHTML += `
    <div class="todo-item">
            <div class="todo-title">
                ${todo.title}
            </div>
            <button class="del-btn">X</button>
        </div>`;
    });
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

    const data = await res.json()

    if(res.status !== 201){
        console.log("something went wrong", res.status)
        return
    }

    todos.push(data)

    console.log(data)
}

const form = document.querySelector('#add-todo-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if(todoInput === '') return

    await addTodo({
        todo: todoInput.value
    })

    form.reset()
    todoList()
})