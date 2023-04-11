var elform = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let ellist = document.querySelector(".js-item");
let elTemplate = document.querySelector(".template-todo").content;
let elcount = document.querySelector('.count')

let data =JSON.parse(localStorage.getItem('alltodo'));


let onCompleted =(evt) =>{
    alltodo.forEach(todo =>{
       if (todo.id === evt.target.dataset.id -0){
       todo.iscompleted = evt.target.checked
        
       }
    })
    
   console.log(alltodo)
   localStorage.setItem('altodo', JSON.stringify(alltodo));
   onRender(alltodo);
}

console.log(data);
let alltodo =data ? data : [];
let onEdit = (evt) => {
  alltodo.forEach((todo) => {let edittext = prompt("Edit text", todo.text);
    if (alltodo.id === evt.target.dataset.id  ) {  
    };
    todo.text = edittext;
  });

  console.log(alltodo);
  onRender(alltodo);
  localStorage.setItem('alltodo',JSON.stringify(alltodo));

};

let onDelete = (evt) => {
  let arr = [];
  alltodo.forEach((todo) => {
    if (alltodo.id === evt.target.dataset.id - 0) {
      arr.push(todo);
    }
  });
  alltodo = arr;
  onRender(arr);
  localStorage.setItem('alltodo',JSON.stringify(arr));
};

let onRender = (arr) => {
  ellist.innerHTML = null;
  elcount.textContent =arr.length;
  arr.forEach((item) => {
    let elTodo = elTemplate.cloneNode(true);
    let eltext = elTodo.querySelector(".todo-text");
    let btnEdit = elTodo.querySelector(".btn-edit");
    let btnDelete = elTodo.querySelector(".btn-delete");
    let elcheckbox = elTodo.querySelector(".checkbox");

    if(item.iscompleted){
       eltext.classList.add('text-decoration-line-through');
    }

     elcheckbox.checked = item.iscompleted;
    eltext.textContent =  item.text;
    btnEdit.dataset.id = item.id;
    btnDelete.dataset.id = item.id;
    elcheckbox.dataset.id =item.id;

    btnEdit.addEventListener("click", onEdit);
    btnDelete.addEventListener("click", onDelete);
    elcheckbox.addEventListener("change",onCompleted );

   

    ellist.appendChild(elTodo);
  });
};

let onsubmit = (eve) => {
  eve.preventDefault();

  let inputValue = elInput.value.trim();

  if (!inputValue) {
    alert("input todo");
  }

  let newtodo = {
    id: alltodo.at(0) ? alltodo.at(0)?.id + 1 : 1,
    text: inputValue,
    iscompleted: false,
  };

  alltodo.unshift(newtodo);

  onRender(alltodo);
  localStorage.setItem('alltodo', JSON.stringify(alltodo));

  elInput.value = null;

  elInput.focus();
};

onRender(alltodo);
elform.addEventListener("submit", onsubmit);
