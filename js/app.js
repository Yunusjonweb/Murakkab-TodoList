const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const btn = document.querySelector(".btn");
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close');

let editItem;

let todos=JSON.parse(localStorage.getItem("list"))?
JSON.parse(localStorage.getItem("list")):
[];

if (todos.length) {
    showTodos();
}

//setTodos
function setTodos() {
    localStorage.setItem("list",JSON.stringify(todos))
}

// time

function getTime() {
    const now=new Date();
    const date=now.getDate()<10?'0'+now.getDate():now.getDate();
    const month=now.getMonth()<10?'0'+(now.getMonth()+1):now.getMonth();
    const year=now.getFullYear();

    const hour=now.getHours()<10?"0"+now.getHours():now.getHours();
    const minutes=now.getMinutes()<10?"0"+now.getMinutes():now.getMinutes();
    const second=now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds();
    const months=[
        "January",
        "Fabruary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octember",
        "November",
        "December",
    ];

    const month_title=now.getMonth()
    fullDay.textContent=`${date} | ${months[month_title]} | ${year}`
    hourEl.textContent=hour;
    minuteEl.textContent=minutes;
    secondEl.textContent=second;
    return `${hour}:${minutes}, ${date}.${month+1}.${year}`;
}

setInterval(() => {
    getTime()
}, 1000);

//show Todos
function showTodos() {
    const todos=JSON.parse(localStorage.getItem("list"));
    listGroupTodo.innerHTML='';
    todos.forEach((item,index)=>{
        listGroupTodo.innerHTML+=`
        <li ondbclick=(setCompleted(${index})) class="list-group-item d-flex justify-content-between ${item.completed ==true ?'complated':''}">
        ${item.text}
        <div class="todo-icon">
          <span class="opacity-50 me-2">
            ${item.timer}
          </span>
          <img onclick=(editTodo(${index})) src="./img/edit.svg" alt="Edit icon" width="25" height="25">
          <img onclick=(deleteTodo(${index})) src="./img/delete.svg" alt="Delete icon" width="25" height="25">
        </div>
       </li>
        `
    })
}

function showMessage(where,message) {
document.getElementById(`${where}`).textContent=message;
setTimeout(() => {
    document.getElementById(`${where}`).textContent='';
}, 2500);
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const inputValue=formCreate["input-create"].value;
    formCreate.reset();
    if (inputValue.length!=0) {
        todos.push({text:inputValue,timer:getTime(),completed:false});
        setTodos();
        showTodos()
    }else{
        showMessage("message-create","Mal'umot kiriting iltmos")
    }
})

// delete todo

function deleteTodo(id) {
const deleteTodo=todos.filter((item,index)=>{
    return id!==index;
})
todos=deleteTodo;
setTodos();
showTodos();
}

//setCompleted

function setCompleted(id) {
    const completedTodos=todos.map((item,index)=>{
        if (id=index) {
            return {...item,completed:item.completed==true?false:true}
        }else{
            return {...item}
        }
    })
    todos=completedTodos;
    setTodos();
    showTodos();
}

formEdit.addEventListener("click",(e)=>{
   e.preventDefault();
   const inputValue=formEdit["input-edit"].value;
   formEdit.reset();
   if (inputValue.length!=0) {
       todos.splice(editItem,1,{text:inputValue,timer:getTime(),completed:false});
       setTodos();
       showTodos();
       close();
   }else{
       showMessage("message-edit","Mal'umot kiriting iltmos")
   }
})

//editTodo
function editTodo(id) {
   open();
   editItem=id;
}

overlay.addEventListener("click",close);
closeEl.addEventListener("click",close);

document.addEventListener("keydown",(e)=>{
   if (e.key==="Escape") {
    close();
   }
})

function open() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function close() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}