let todoListsContainer = document.getElementById("todoListsContainer");
let userInput = document.getElementById("userInput");
let savedBtnIcon = document.getElementById("savedBtnIcon")
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addNewTodo()
    }
})

function findCurrentdateTime() {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}  ${hour<=9 ? "0"+hour : hour }:${minutes<=9 ? "0"+minutes : minutes }`
}

function getTodoFromLocalStorage() {
    let storedValue = localStorage.getItem("todoList");
    let parsedstoredValue = JSON.parse(storedValue);
    if (parsedstoredValue === null) {
        return [];
    } else {
        return parsedstoredValue;
    }
}

let todoList = getTodoFromLocalStorage();

function saveBtn() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    savedBtnIcon.classList.remove("d-none");
    let intervalId = setTimeout(function() {
        savedBtnIcon.classList.add("d-none")
    }, 1000);
}

let todoListLength = todoList.length;

function deleteTodoItem(todo) {
    let todoItem = document.getElementById(todo)
    todoListsContainer.removeChild(todoItem)

    let indexOfTodo = todoList.findIndex(function(eachItem) {
        eachItem = "todo" + eachItem.uniqeId
        if (eachItem === todo) {
            return true
        }
    })
    todoList.splice(indexOfTodo, 1)
}

function createTodoItem(todo) {
    let checkboxId = "checkbox" + todo.uniqeId;
    let todoId = "todo" + todo.uniqeId;
    let labelId = "label" + todo.uniqeId;

    let holeList = document.createElement("li")
    holeList.style.listStyleType = "none";
    holeList.style.marginBottom = "26px";
    holeList.id = todoId;

    todoListsContainer.prepend(holeList);

    let dateTimeBtnContainer = document.createElement("div")
    dateTimeBtnContainer.classList.add("text-right");
    dateTimeBtnContainer.style.marginBottom = "0px";
    holeList.appendChild(dateTimeBtnContainer)

    let dateTimeBtn = document.createElement("button");
    dateTimeBtn.textContent = todo.date;
    dateTimeBtn.classList.add("datetime-btn")
    dateTimeBtn.classList.add("btn", "btn-primary");
    dateTimeBtnContainer.appendChild(dateTimeBtn)

    let todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list-container", "d-flex", "flex-row");
    // todoListContainer.id = todoId;
    holeList.appendChild(todoListContainer);


    let checkboxEle = document.createElement("input");
    checkboxEle.id = checkboxId;
    checkboxEle.classList.add("checkbox");
    checkboxEle.type = "checkbox";
    checkboxEle.checked = todo.isChecked;
    todoListContainer.appendChild(checkboxEle);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row")
    todoListContainer.appendChild(labelContainer);

    let paraEle = document.createElement("label");
    paraEle.textContent = todo.text;
    paraEle.id = labelId;
    paraEle.htmlFor = checkboxId;
    paraEle.classList.add("para");
    labelContainer.appendChild(paraEle);

    let deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.classList.add("delete-container", "d-flex", "flex-row", "justify-content-center");
    labelContainer.appendChild(deleteButtonContainer);


    let deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    deleteButtonContainer.appendChild(deleteButton)
    deleteButton.onclick = function() {
        deleteTodoItem(todoId)
    }

    if (checkboxEle.checked) {
        paraEle.classList.add("checked")
        deleteButton.classList.add("fa-bounce")
    }
    checkboxEle.onclick = function() {
        if (checkboxEle.checked) {
            paraEle.classList.add("checked");
            deleteButton.classList.add("fa-bounce")
            todo.isChecked = true;
        } else {
            paraEle.classList.remove("checked");
            deleteButton.classList.remove("fa-bounce")
            todo.isChecked = false
        }
    }
}

function addNewTodo() {
    todoListLength = todoListLength + 1
    let userInputVal = userInput.value
    if (userInputVal === "") {
        alert("Please enter Somthing todo...")
    } else {
        let newTodo = {
            text: userInputVal,
            uniqeId: todoListLength,
            isChecked: false,
            date: findCurrentdateTime()
        }
        todoList.push(newTodo);
        createTodoItem(newTodo)
    }
    userInput.value = "";
}
for (let eachTodo of todoList) {
    createTodoItem(eachTodo)
}
