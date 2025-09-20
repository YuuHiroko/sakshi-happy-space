interface Props {
  show3D: boolean;
  setShow3D: (show: boolean) => void;
}

export default function Navbar({ show3D, setShow3D }: Props) {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 shadow-lg rounded-b-lg">
      <span className="text-2xl font-bold gradient-text">🎂 Sakshi's Magical Birthday 🎈</span>
      <button
        className="px-4 py-2 rounded-lg bg-white font-bold shadow-md hover:bg-pink-200 transition"
        onClick={() => setShow3D(!show3D)}
      >
        {show3D ? 'Classic Mode' : '3D Birthday Mode'}
      </button>
    </nav>
  );
}