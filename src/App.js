
import './App.css';
import Register from './Components/register';
import viewUsers from './Components/Users'
import React ,{ useState } from 'react';


function App() {

  const [showUsers,setshowUsers] =useState(false)
  return (
    <div>
      {(showUsers)? null: <Register showUsers={showUsers}/>}
      <viewUsers setshowUsers={setshowUsers}/>
    </div>
  )
}

export default App;
