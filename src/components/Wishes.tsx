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
    if (!name || !message) return;
    const newWishes = [...wishes, { name, message }];
    setWishes(newWishes);
    localStorage.setItem('birthday-wishes', JSON.stringify(newWishes));
    setName('');
    setMessage('');
  };

  return (
    <section className="wishes-section">
      <h2 className="text-2xl mb-4 font-semibold">Send Sakshi a Birthday Wish! 💝</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Your wish"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="px-2 py-1 border rounded w-2/3"
        />
        <button onClick={handleAddWish} className="bg-pink-400 px-4 py-1 rounded text-white font-bold">Send</button>
      </div>
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