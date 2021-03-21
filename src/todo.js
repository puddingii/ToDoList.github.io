const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function editInput(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.querySelector(".editInput").value;
    const span = document.createElement("span");
    const editText = document.createElement("input");

    editText.type="image";
    editText.src="images/edit.png";
    editText.className = "editBtn";
    editText.addEventListener("click",editToDo);
    span.innerText = text;
    const editToDos = toDos.filter(function(toDo) {
        if(toDo.id !== parseInt(li.id)) {
            return true;
        } else {
            toDoObj = {
                text: text,
                id: toDo.id,
                chk: toDo.chk
            };
            return false;
        }
    });
    editToDos.push(toDoObj);
    toDos = editToDos;
    li.removeChild(li.querySelector(".editBtn"));
    li.removeChild(li.querySelector(".editInput"));
    li.appendChild(span);
    li.appendChild(editText);
    saveToDos();
}

function editToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const editBtn = li.querySelector(".editBtn");
    const inputText = document.createElement("input");
    const editText = document.createElement("input");

    editText.type="image";
    editText.src="images/edit.png";
    editText.className = "editBtn";
    editText.addEventListener("click",editInput);
    
    inputText.type = "text";
    inputText.className = "editInput";
    inputText.value = span.innerText;
    li.removeChild(span);
    li.removeChild(editBtn);
    li.appendChild(inputText);
    li.appendChild(editText);
}

function checkToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const editBtn = li.querySelector(".editBtn");
    li.classList.toggle("finished");
    let toDoObj;
    if(li.className === "finished") {
        editBtn.classList.add("editing");
        chk = true;
    } else {
        editBtn.classList.remove("editing");
        chk = false;
    }
    const checkToDos = toDos.filter(function(toDo) {
        if(toDo.id !== parseInt(li.id)) {
            return true;
        } else {
            toDoObj = {
                text: toDo.text,
                id: toDo.id,
                chk: chk
            };
            return false;
        }
    });
    checkToDos.push(toDoObj);
    toDos = checkToDos;
    saveToDos();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function setLengthId() {
    if(toDos.length === 0) {
        return 1;
    } else {
        const ndList = toDoList.childNodes;
        return parseInt(ndList[ndList.length - 1].id) + 1;
    }
}

function paintToDo(text, chk) {
    const li = document.createElement("li");
    const delBtn = document.createElement("input");
    const chkBtn = document.createElement("input");
    const editBtn = document.createElement("input");
    const span = document.createElement("span");
    const newId = setLengthId();
    delBtn.type="image"
    delBtn.src="images/X.png";
    delBtn.className = "delBtn";
    delBtn.addEventListener("click",deleteToDo);
    chkBtn.type="image";
    chkBtn.src="images/Check.png";
    chkBtn.className = "chkBtn";
    chkBtn.addEventListener("click",checkToDo);
    editBtn.type="image";
    editBtn.src="images/edit.png";
    editBtn.addEventListener("click",editToDo);
    editBtn.className = "editBtn";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(chkBtn);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.id = newId;
    if(chk === true) {
        li.className="finished";
        editBtn.classList.add("editing");
    }
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        chk: chk
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue, false);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, toDo.chk);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();