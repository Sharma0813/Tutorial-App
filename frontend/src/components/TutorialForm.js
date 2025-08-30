import React, { useEffect, useState } from 'react';

export default function TutorialForm({ onSubmit, editing, onUpdate }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=> {
    if(editing){
      setTitle(editing.title || '');
      setDescription(editing.description || '');
    }
  }, [editing]);

  function submit(e){
    e.preventDefault();
    if(editing){
      onUpdate(editing.id, { title, description });
    } else {
      onSubmit({ title, description });
      setTitle('');
      setDescription('');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <input value={title} onChange={e=> setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e=> setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">{editing ? 'Update' : 'Add Tutorial'}</button>
    </form>
  )
}