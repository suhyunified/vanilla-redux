import { createStore } from 'redux'

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.getElementById("number")

const ADD = "ADD"
const MINUS = "MINUS"

const countModifier = (count = 0, { type }) => {
  switch (type) {
    case ADD:
      return count + 1
    case MINUS:
      return count - 1
    default:
      return count
  }
}

const countStore = createStore(countModifier)

const onChange = () => {
  number.innerHTML = countStore.getState()
}

countStore.subscribe(onChange)

const handleButton = (type) => {
  countStore.dispatch({ type })
}

add.addEventListener("click", () => handleButton(ADD))
minus.addEventListener("click", () => handleButton(MINUS))
