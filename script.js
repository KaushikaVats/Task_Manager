
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList" : [] }
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todoText){
     const todos = loadTodos();
     todos.todoList.push(todoText);
     localStorage.setItem("todos" , JSON.stringify(todos));
}

function appendTodoInhtml(todoText){
    const todoList = document.getElementById("todoList");

    const todo = document.createElement("li")
    todo.textContent = todoText
    todoList.appendChild(todo)
}


document.addEventListener("DOMContentLoaded" , () => {

   const todoInput = document.getElementById("input");
   const submitButton = document.getElementById("addTodo");


   submitButton.addEventListener("click" , (event)=>{
      const todoText = input.value;
      if(todoText == ''){
        alert("Please write something for the the Task MAnager")
      }else{
        addTodoToLocalStorage(todoText);
        appendTodoInhtml(todoText);
        todoInput.value = ""
      }
   })
   
   input.addEventListener("change" , (event)=>{
  
    const todoText = event.target.value;
    event.target.value = todoText.trim();
    console.log(event.target.value)

})

   const todos =  loadTodos();
   todos.todoList.forEach(todo => {
      const newTodoItem = document.createElement("li");
      newTodoItem.textContent = todo;
      todoList.appendChild(newTodoItem)
   });
});