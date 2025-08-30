import React from 'react';

export default function TutorialList({ items, onEdit, onDelete }){
  if(!items || items.length===0) return <p>No tutorials yet.</p>;
  return (
    <ul className="list">
      {items.map(t=> (
        <li key={t.id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <div className="actions">
            <button onClick={()=> onEdit(t)}>Edit</button>
            <button onClick={()=> onDelete(t.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}