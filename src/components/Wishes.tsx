import { useState, useEffect } from 'react';

interface Wish {
  name: string;
  message: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('birthday-wishes');
    if (stored) setWishes(JSON.parse(stored));
  }, []);

  const handleAddWish = () => {
    if (!name.trim() || !message.trim()) return;
    const newWishes = [...wishes, { name: name.trim(), message: message.trim() }];
    setWishes(newWishes);
    localStorage.setItem('birthday-wishes', JSON.stringify(newWishes));
    setName('');
    setMessage('');
  };

  return (
    <section className="wishes-section" aria-label="Birthday wishes">
      <h2 className="text-2xl mb-4 font-semibold">Send Sakshi a Birthday Wish! 💝</h2>
      <form className="flex gap-2 mb-4" onSubmit={e => { e.preventDefault(); handleAddWish(); }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-2 py-1 border rounded"
          maxLength={32}
          aria-label="Your name"
        />
        <input
          type="text"
          placeholder="Your wish"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="px-2 py-1 border rounded w-2/3"
          maxLength={120}
          aria-label="Your birthday wish"
        />
        <button type="submit" className="bg-pink-400 px-4 py-1 rounded text-white font-bold">Send</button>
      </form>
      <div className="wishes-list">
        {wishes.length === 0 ? (
          <p>No wishes yet. Be the first!</p>
        ) : (
          <ul>
            {wishes.map((wish, i) => (
              <li key={i} className="bg-pink-100 p-2 rounded my-1">
                <span className="font-bold">{wish.name}:</span> <span>{wish.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}