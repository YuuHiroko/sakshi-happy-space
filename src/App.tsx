import { useState } from 'react';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import Wishes from './components/Wishes';
import './styles/birthday.css';

function App() {
  const [show3D, setShow3D] = useState(true);

  return (
    <div className="birthday-bg min-h-screen flex flex-col">
      <Navbar show3D={show3D} setShow3D={setShow3D} />
      <main className="flex-1 container mx-auto py-8">
        {show3D ? <Scene3D /> : (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Happy Birthday Sakshi! 🎉</h1>
            <Wishes />
          </>
        )}
      </main>
    </div>
  );
}

export default App;