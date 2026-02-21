import { useState } from "react"; // start/count

function App() { //fuction App
  const a = 5;
  let message;

  const [count, setCount] = useState(0); //count

  const students = ["Anne", "Bob", "Charlie"]; // array

  const [task, setTasks] = useState({}); //Store Task
  const [input, setInput] = useState(""); //Store Input Value

  const addTask = () => {
    if(input.trim() === "") return; //Prevent adding empty tasks
    setTasks([...tasks, input]);// Add new tasks to the list
    setInput(""); // Clear input field
  }

  const isLoggedIn = true; // Conditional Statement
if(isLoggedIn)
       {
        message = "Welcome back!"
       } 
       else
       {
        message = "Please log in."
       }

  return (
    <div>     
       <h1> Hello, React!</h1>
       <p>a is equal to {a}</p>   
       <p>{message}</p>  

       {/*Ternary Operator*/}
       <h2>{a > 5 ? "Welcome" : "Please Login."}</h2>

       <p>Count: {count}</p>
       <button onClick = {() => setCount(count + 1)}> //increase
        Increase 
       </button> 

       <button onClick = {() => setCount(count - 1)}> decrease
        Decrease 
       </button>

       <button onClick = {() => setCount(0)}> //reset
        Reset
       </button>

       <ul>
        {students.map((students, index) => ( // array
          <li key={index}>{students}</li>
        ))}
       </ul>

    </div>
  );
}

export default App; // end
