function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList" : [] }
    console.log(todos);
    return todos;
}

function refreshTodos(todos){
   localStorage.setItem("todos", JSON.stringify(todos))
}

function addTodoToLocalStorage(todo){
     let todos = loadTodos();
     todos.todoList.push({...todo});
     localStorage.setItem("todos" , JSON.stringify(todos));
}

function executeFilterAction(event){
   console.log(event.target)
   const todoList = document.getElementById("todoList");
   const element = event.target;
   const value = element.getAttribute('data-filter');
   todoList.innerHTML = '';
   const todos = loadTodos();

   if(value == "all"){
      console.log(todoList);
      todos.todoList.forEach(todo => {
         appendTodoInhtml(todo);
       });
   }else if(value === "pending") {
      todos.todoList.forEach(todo => {
         if(todo.isCompleted !== true)
         appendTodoInhtml(todo);
       });

   }else{
      todos.todoList.forEach(todo => {
         if(todo.isCompleted === true)
         appendTodoInhtml(todo);
       });
   }
}

function appendTodoInhtml(todo){
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id",todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted){
       textDiv.classList.add("completed");
    }

    textDiv.textContent = todo.text;

    todoItem.classList.add("todoItem");
     

    const wrapper = document.createElement("div")
    wrapper.classList.add("todoButtons")

    const editbtn = document.createElement("button")
    editbtn.textContent = "EDIT";
    editbtn.classList.add("editbtn");
    editbtn.addEventListener("click" , editTodo);
  
    const deletebtn = document.createElement("button")
    deletebtn.textContent = "DELETE";
    deletebtn.classList.add("deletebtn")
    deletebtn.addEventListener("click" , deleteTodo)

    const completedbtn = document.createElement("button")
    completedbtn.textContent = (todo.isCompleted) ? "Completed" : "Reset";
    completedbtn.classList.add("completedbtn") 
    completedbtn.addEventListener("click" , toggleTodo)  ///changed

    
  wrapper.appendChild(editbtn)
  wrapper.appendChild(deletebtn)
  wrapper.appendChild(completedbtn)

  todoItem.appendChild(textDiv)
  todoItem.appendChild(wrapper)

   todoList.appendChild(todoItem)
}

function resetHtmlTodos(todos){
   const todoList = document.getElementById("todoList");
   todoList.innerHTML = '';
   todos.todoList.forEach(todo => {
      appendTodoInhtml(todo);
   })
}
function toggleTodo(event){
   const todoItem = event.target.parentElement.parentElement;
   const todoId = todoItem.getAttribute("data-id");
   const todos = loadTodos();
   todos.todoList.forEach(todo => {
      if(todo.id == todoId){
         todo.isCompleted = !todo.isCompleted;
      }
   });
   refreshTodos(todos);
    resetHtmlTodos(todos);
}

function deleteTodo(event){
   const todoItem = event.target.parentElement.parentElement;
   const todoId = todoItem.getAttribute("data-id");
   let todos = loadTodos();
   todos.todoList= todos.todoList.filter(todo => todo.id != todoId);
   refreshTodos(todos);
   resetHtmlTodos(todos);
}

function editTodo(event){
   const todoItem = event.target.parentElement.parentElement;
   const todoId = todoItem.getAttribute("data-id");
   let todos = loadTodos();
   const response = prompt("What's  the new task that you want to set ?");
   todos.todoList.forEach(todo => {
      if(todo.id == todoId){
         todo.text= response;
      }
   });

   refreshTodos(todos);
   resetHtmlTodos(todos);
}


function addNewTodo(){
   const todoText = input.value;
   if(todoText === ''){
     alert("Please write something for the the Task Manager")
   }else{
        todos = loadTodos();
       const id = todos.todoList.length;
     addTodoToLocalStorage({text:todoText,isCompleted:false,id});
     appendTodoInhtml({text:todoText,isCompleted:false ,id});
   input.value = "" ///
   }
}

document.addEventListener("DOMContentLoaded" , () => {
   
   const todoInput = document.getElementById("input");

   const submitButton = document.getElementById("addTodo");

   let todos = loadTodos();

   const todoList = document.getElementById("todoList");
  
  // const completedBtns = document.getElementsByClassName("completedbtn");

  const filterBtns = document.getElementsByClassName("filterBtn");

  for( const btn of filterBtns){
   btn.addEventListener("click", executeFilterAction);
  }
  

   submitButton.addEventListener("click", addNewTodo);
   
   input.addEventListener("change" , (event)=>{
  
    const todoText = event.target.value;

    event.target.value = todoText.trim();

});


   todos.todoList.forEach(todo => {
     appendTodoInhtml(todo);
   });
    
   document.addEventListener("keypress" , (event) =>{
      if(event.code == "Enter" ) {
         addNewTodo();
      }
   })
   
});