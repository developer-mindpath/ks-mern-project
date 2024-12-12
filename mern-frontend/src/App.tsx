import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    try {
      fetch('http://localhost:3000/api')
      .then(res =>  res.json())
      .then(data => {
        setCount(data);
        console.log(data);
      })
    } catch (error) {
       console.log(error);
    }
   
  }, [])
  
  return (
    <>
      <div>Data : {count}</div>
    </>
  )
}

export default App
