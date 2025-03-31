
import './App.css';
import Register from './Components/register';
import Users from './Components/Users'
import React ,{ useState } from 'react';


function App() {

  const [showUsers,setshowUsers] =useState(false)
  return (
    <div>
      {(showUsers)? null: <Register showUsers={showUsers}/>}
      <Users setshowUsers={setshowUsers}/>
    </div>
  )
}

export default App;
