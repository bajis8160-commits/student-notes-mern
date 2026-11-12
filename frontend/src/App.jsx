import { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ subject: '', title: '', content: '' });
  const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/notes';

  const load = () => fetch(API).then((res) => res.json()).then(setNotes);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ subject: '', title: '', content: '' });
    load();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>🎓 Student Notes Sharing</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input placeholder="Subject (e.g. DBMS, OS)" value={form.subject} required
          onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ padding: '8px' }} />
        <input placeholder="Topic / Title" value={form.title} required
          onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ padding: '8px' }} />
        <textarea placeholder="Key Notes / Summary" value={form.content} required
          onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '8px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Share Note</button>
      </form>

      <h3 style={{ marginTop: '20px' }}>Shared Notes ({notes.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notes.map((n) => (
          <div key={n._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
            <span style={{ fontSize: '11px', background: '#eee', padding: '2px 5px', borderRadius: '3px' }}>{n.subject}</span>
            <h4 style={{ margin: '6px 0' }}>{n.title}</h4>
            <p style={{ margin: '4px 0', color: '#555' }}>{n.content}</p>
            <button onClick={() => handleDelete(n._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}