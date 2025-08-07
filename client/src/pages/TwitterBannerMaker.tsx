import React, { useEffect, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { Canvas, Rect } from 'fabric';

const TwitterBannerMaker = () => {
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showTextPicker, setShowTextPicker] = useState(false);
  const canvasRef = useRef(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      fabricRef.current = new Canvas(canvasRef.current, {
        width: 1500,
        height: 500,
        backgroundColor: '#fff',
        preserveObjectStacking: true,
      });
    }
    return () => {
      fabricRef.current?.dispose();
      fabricRef.current = null;
    };
  }, []);

  // Example: Add rectangle (to be connected to sidebar button)
  const addRectangle = () => {
    if (fabricRef.current) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: '#3498db',
        width: 200,
        height: 100,
        rx: 10,
        ry: 10,
        objectCaching: false,
      });
      fabricRef.current.add(rect).setActiveObject(rect);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[300px] bg-gray-50 border-r border-gray-200 flex flex-col p-4">
        <div className="font-bold text-lg mb-4">Shapes</div>
        <div className="flex flex-col gap-2 mb-6">
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={addRectangle}>Rectangle</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add circle */ }}>Circle</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add triangle */ }}>Triangle</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add star */ }}>Star</button>
        </div>
        <div className="font-bold text-lg mb-4">Patterns</div>
        <div className="flex flex-col gap-2">
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add solid pattern */ }}>Solid</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add dots pattern */ }}>Dots</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add stripes pattern */ }}>Stripes</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add grid pattern */ }}>Grid</button>
          <button className="py-2 px-4 rounded bg-white border hover:bg-blue-50 transition" onClick={() => { /* add waves pattern */ }}>Waves</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-[60px] bg-white border-b border-gray-200 flex items-center px-6 gap-4 relative">
          <div className="font-semibold text-md mr-8">Twitter Banner Creator</div>
          <button
            className="py-1 px-3 rounded border bg-gray-50 hover:bg-blue-50 transition"
            onClick={() => setShowBgPicker((v) => !v)}
          >
            Background Color
          </button>
          {showBgPicker && (
            <div className="absolute top-16 left-32 z-10 shadow-lg">
              <ChromePicker color="#ffffff" onChange={() => {}} />
            </div>
          )}
          <button
            className="py-1 px-3 rounded border bg-gray-50 hover:bg-blue-50 transition"
            onClick={() => setShowTextPicker((v) => !v)}
          >
            Text Color
          </button>
          {showTextPicker && (
            <div className="absolute top-16 left-64 z-10 shadow-lg">
              <ChromePicker color="#000000" onChange={() => {}} />
            </div>
          )}
          <button
            className="py-1 px-3 rounded border bg-gray-50 hover:bg-blue-50 transition ml-4"
            onClick={() => { /* export logic */ }}
          >
            Export/Download
          </button>
          <button
            className="py-1 px-3 rounded border bg-gray-50 hover:bg-blue-50 transition ml-2"
            onClick={() => { /* add text tool */ }}
          >
            Text Tool
          </button>
        </div>
        {/* Canvas Area */}
        <div className="flex-1 flex justify-center items-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg flex items-center justify-center" style={{ width: 1500, height: 500 }}>
            <canvas ref={canvasRef} width={1500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterBannerMaker;