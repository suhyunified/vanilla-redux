import { createStore } from 'redux'

const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

const addToDo = (text) => {
  return { 
    type: ADD_TODO, 
    text 
  }
}

const deleteToDo = (id) => {
  return { 
    type: DELETE_TODO, 
    id
  }
}

// NOT RECOMENDED MUTATION STATE
// const reducer = (state = [], { type, text }) => {
//   switch (type) {
//     case ADD_TODO: 
//       state.push(text)
//       return state
//     case DELETE_TODO:
//       return []
//     default:
//       return state
//   }
// }

const reducer = (state = [], { type, text, id }) => {
  switch (type) {
    case ADD_TODO: 
      return [{ text, id: Date.now() }, ...state ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== +id)

    default:
      return state
  }
}

const store = createStore(reducer)

const paintoDos = () => {
  ul.innerHTML = ''

  const toDos = store.getState()
  toDos.forEach(toDo => {
    const li = document.createElement('li')
    li.innerHTML = toDo.text
    li.id = toDo.id

    const button = document.createElement('button')
    button.innerHTML = 'DELETE'
    button.addEventListener("click", dispatchDeleteToDo)  

    li.appendChild(button)
    ul.appendChild(li)
  })
}

store.subscribe(paintoDos)

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = e => {
  const { id }= e.target.parentNode
  store.dispatch(deleteToDo(id))
}

const getInputValue = () => {
  const value = input.value
  input.value = ''

  return value
}

const onSubmit = e => {
  e.preventDefault()

  const toDo = getInputValue()
  dispatchAddToDo(toDo)
}

form.addEventListener("submit", onSubmit)