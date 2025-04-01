
import './App.css';
import Register from './Components/register'
import ViewUsers from './Components/Users'
import React ,{ useState } from 'react';

function App() {

  const [showUsers,setshowUsers] =useState(false)
  return (
    <div>
      {(showUsers)? null: <Register showUsers={showUsers}/>}
      <ViewUsers setshowUsers={setshowUsers}/>
    </div>
  )
}

export default App;
