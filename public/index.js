// index.js
// import { createStore } from 'redux';

// Define initial state
console.log("WOKRING REDUX")
function alertWind() {
  document.getElementById('navbar').innerHTML = 'something'
  console.log("SOMETHING")
}

const initialState = {
  counter: 0,
  books: []
};


const increment = () => {
  return {
    type: "increment"
  }
}

const decrement = () => {
  return {
    type: "decrement"
  }
}


const getBooks = () => {
  return {
    type: "get_books",
    payload: action.payload
  }
}
// Define reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define cases for different actions
    // Update state accordingly
    case "increment":
      return {
        ...state,
        counter: state.counter + 1
      }
    case "decrement":
      return {
        ...state,
        counter: state.counter - 1
      }
    case "get_books":
      return {
        ...state,
        books: action.payload
      }
    default:
      return state;
  }
};

// Create Redux store
const store = Redux.createStore(rootReducer);

function render() {
  const state = store.getState();
  document.getElementById("increment").innerHTML = state.counter

  console.log(state)
}


document.getElementById("increment")
  .addEventListener("click", () => {
    store.dispatch(increment())

    render()
  })
async function fetchBooks() {
  console.log("Fetching books...");
  const books = await fetch("http://localhost:3000/books/getBooks", { method: 'GET' })
  let single = await books.json()
  console.log("clg", single)

  store.dispatch({
    type: "get_books",
    payload: single
  }
  )
}
// fetchBooks()

// document.getElementById("increment")
// .addEventListener("click", () =>{ 
//     store.dispatch(decrement())
//     render()
// })

// Export the store

export default store;