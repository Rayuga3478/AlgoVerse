import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/layout/Canvas';
import { PlaybackControls } from './components/controls/PlaybackControls';

function App() {
  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden text-zinc-100 font-inter">
      {/* Left Sidebar (AI Input + Explanation) */}
      <Sidebar />

      {/* Right Area (Visualization + Controls) */}
      <div className="flex-1 relative flex flex-col">
        <Canvas />
        <PlaybackControls />
      </div>
    </div>
  );
}

export default App;
