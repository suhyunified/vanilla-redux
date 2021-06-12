const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

const toDos = []

const createToDo = toDo => {
  const li = document.createElement('li')
  toDos.push(toDo)
  li.innerHTML = toDo
  ul.appendChild(li)
}

const onSubmit = e => {
  e.preventDefault()
  const toDo = input.value
  input.value = ''
  createToDo(toDo)
}

form.addEventListener("submit", onSubmit)