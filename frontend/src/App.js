import React, { useEffect, useState } from 'react';
import TutorialForm from './components/TutorialForm';
import TutorialList from './components/TutorialList';
import './styles.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function App(){
  const [tutorials, setTutorials] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(()=> {
    fetch(API + '/api/tutorials')
      .then(r=> r.json())
      .then(setTutorials)
      .catch(console.error);
  }, []);

  function addTutorial(t){
    fetch(API + '/api/tutorials', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(t)
    }).then(r=> r.json()).then(nt => setTutorials(prev => [nt, ...prev]));
  }

  function updateTutorial(id, body){
    fetch(API + '/api/tutorials/'+id, {
      method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
    }).then(r=> r.json()).then(u => setTutorials(prev => prev.map(p=> p.id===u.id?u:p)));
    setEditing(null);
  }

  function deleteTutorial(id){
    fetch(API + '/api/tutorials/'+id, { method:'DELETE' }).then(()=> setTutorials(prev => prev.filter(p=> p.id!==id)));
  }

  return (
    <div className="container">
      <h1>Tutorial App</h1>
      <TutorialForm onSubmit={addTutorial} editing={editing} onUpdate={updateTutorial} />
      <TutorialList items={tutorials} onEdit={setEditing} onDelete={deleteTutorial} />
    </div>
  )
}

export default App;