function toogleTask () {
  this.classList.toggle("checked");
}

function newElement () {
  const input = document.getElementById('task')
  const text = input.value

  if (input.value === '') {
    const myToast = $('#liveToast.error')
    myToast.toast('show')
    return
  }

  const element = createElement(text)
  const span = document.createElement('span')
  span.style.float = 'right'
  span.innerHTML = 'x'
  element.appendChild(span)
  let list = document.getElementById('list')
  list.appendChild(element)

  const myToast = $('#liveToast.success')
  myToast.toast('show')

  $(span).on('click', removeTask)
  $(element).on('click', toogleTask)

  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (!storedTasks) {
    let arr = []
    arr.push(text)
    storedTasks = arr
  } else {
    storedTasks.push(text)
  }
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function createElement (value) {
  const element = document.createElement('li')
  element.innerHTML = value
  return element
}

function removeTask () {
  let list = document.getElementById('list')
  var text = this.parentElement.childNodes[0].data

  var storedTasks = JSON.parse(localStorage.getItem("tasks"));
  var index = storedTasks.findIndex((i) => i === text)
  storedTasks.splice(index, 1)
  localStorage.setItem("tasks", JSON.stringify(storedTasks));

  this.parentElement.remove()
}

$(document).ready(function() {
  let list = document.getElementById('list')

  var storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (!storedTasks) {
    return
  }

  for (let i = 0; i < storedTasks.length; i++) {
    const element = createElement(storedTasks[i])
    const span = document.createElement('span')
    span.style.float = 'right'
    span.innerHTML = 'x'
    element.appendChild(span)
    $(span).on('click', removeTask)
    $(element).on('click', toogleTask)
    list.appendChild(element)
  }
});





