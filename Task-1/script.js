// Developed by SPD, 24 JUL 2023

// elements

const count = document.querySelector('#count');
const clear = document.querySelector('#clear');
const taskBar = document.querySelector('#task');
const addbutton = document.querySelector('#addButton');
const container = document.querySelector('#list-items');

// variable
let taskCount = 0;

// functions
function updateCount(){
    
        count.innerHTML = taskCount;
        if(taskCount <= 3){
            count.className = '';
            count.classList.add('good');
        }
        else if(taskCount < 6){
            count.className = '';
            count.classList.add('nice');
        }
        else{
            count.className = '';
            count.classList.add('bad');
        }
    
}

function addTask(){
    if(taskBar.value === ''){
        alert("Enter Something First");
    }
    else{
        
        let li = document.createElement('li');
        li.innerHTML = `<input value="${taskBar.value}" readonly>`;
        container.appendChild(li); 

        //edit and delete
        let options = document.createElement('div');
        options.classList.add('options');

        let edit = document.createElement('span');
        edit.classList.add('edit');
        
        let del = document.createElement('span');
        del.classList.add('del');
        

        options.appendChild(edit);
        options.appendChild(del);

        li.appendChild(options);

        //keeping count
        taskCount += 1;
        updateCount();
    }
    taskBar.value = '';
    updateData();
}

function clearAll(){
    // clear data
    container.innerHTML = '';
    updateData();

    //reset count
    taskCount = 0;
    updateCount();
}

// clear All
clear.addEventListener('click', clearAll);

// add task
addbutton.addEventListener('click', addTask);
taskBar.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13){
        addTask();
    }
});

// toggle/options check
container.addEventListener('click', (e)=>{
    if(e.target.tagName === "INPUT"){
        if(e.target.classList.contains("editMode") == false){
            let li_Cl = e.target.parentElement.classList;
    
            if(li_Cl.contains("checked")){
                li_Cl.remove("checked");
    
                taskCount += 1;
                updateCount();
            }
            else{
                li_Cl.add("checked");
    
                taskCount -= 1;
                updateCount();
            }
    
            
        }
    }
    else if(e.target.tagName === "SPAN"){
        if (e.target.classList.value === 'del') {
            let li_Cl = e.target.parentElement.parentElement.classList;
            
            if(!(li_Cl.contains("checked"))){
                
                taskCount -= 1;
                updateCount();
            }
            e.target.parentElement.parentElement.remove();            
            
        }
        if (e.target.classList.value === 'edit'){
            let li = e.target.parentElement.parentElement;
            let inp = e.target.parentElement.previousElementSibling;
            
            if(inp.hasAttribute("readonly")){
                inp.removeAttribute("readonly");
                inp.classList.add('editMode');
                inp.focus();
                if(li.classList.contains("checked")){

                    li.classList.remove("checked");
                    //keeping count
                    taskCount += 1;
                    updateCount();
                }
    
                e.target.style.background = "url(pics/editAct.png)";
                e.target.style.backgroundSize = "cover";
    
            }else{
                inp.setAttribute("readonly", true);
    
                e.target.style.background = "url(pics/edit.png)";
                e.target.style.backgroundSize = "cover";
    
                inp.classList.remove('editMode');
                inp.blur();
                console.log(inp.value);
                inp.setAttribute("value", inp.value);
            }
        }
    }
    
    
    updateData();
});


//updateData to local storage

function updateData(){
    localStorage.setItem("list", container.innerHTML);
    localStorage.setItem("count", count.innerHTML);
}

function fetchData(){
    container.innerHTML = localStorage.getItem("list");
    count.innerHTML = localStorage.getItem("count");
    taskCount = localStorage.getItem("count");
}

// gather all previous data
fetchData();