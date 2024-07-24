
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

document.addEventListener("DOMContentLoaded" , () => {

   const todoInput = document.getElementById("input");
   const submitButton = document.getElementById("addTodo");


   submitButton.addEventListener("click" , (event)=>{
      const todoText = input.value;
      if(todoText == ''){
        alert("Please write something for the the Task MAnager")
      }else{
        addTodoToLocalStorage(todoText)
      }
   })
   
   input.addEventListener("change" , (event)=>{
  
    const todoText = event.target.value;
    event.target.value = todoText.trim();
    console.log(event.target.value)

})

     loadTodos();
});