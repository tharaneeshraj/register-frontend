
import './App.css';
import React, { useState } from "react";
import Register from './Components/register'
import ViewUsers from './Components/Users'

function App() {
  const [showUsers, setShowUsers] = useState(false);
  return (
    <div>
      {(showUsers)? null : <Register setShowUsers={setShowUsers}/>}
      <ViewUsers setShowUsers={setShowUsers}/>
    </div>
  );
}

export default App;