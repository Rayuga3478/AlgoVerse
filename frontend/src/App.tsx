import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/layout/Canvas';
import { PlaybackControls } from './components/controls/PlaybackControls';

function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden text-zinc-100 font-inter">
      {/* Left Sidebar (AI Input + Explanation) - 40% */}
      <div className="w-full lg:w-[40%] flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Right Area (Visualization + Controls) - 60% */}
      <div className="flex-1 w-full lg:w-[60%] relative flex flex-col z-10">
        <Canvas />
        <PlaybackControls />
      </div>
    </div>
  );
}

export default App;
