import { useState } from 'react';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import Wishes from './components/Wishes';
import './styles/birthday.css';

function App() {
  const [show3D, setShow3D] = useState(true);

  return (
    <div className="birthday-bg min-h-screen">
      <Navbar show3D={show3D} setShow3D={setShow3D} />
      <main className="container mx-auto py-8">
        {show3D ? (
          <Scene3D />
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Happy Birthday Sakshi! 🎉</h1>
            <Wishes />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;