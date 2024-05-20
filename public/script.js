// // script.js

// // Import the Redux store
// import store from './index.js';

//  async function fetchBooks(){
//   console.log("Fetching books...");
//   const books = await fetch("http://localhost:3000/getBooks", {method: 'GET'})
//   console.log("clg",books)
//  }
// fetchBooks()






// Subscribe to store changes
store.subscribe(() => {
  // Access the updated state
  const currentState = store.getState();
  console.log(currentState)
  // Update your UI or perform actions based on the state
  document.getElementById("most-popular").appendChild(`<p>AUTO GEN</p>`)
});

// Dispatch actions to update state
document.getElementById('increment').addEventListener('click', () =>

store.dispatch({ type: 'increment' })
)

