
import React from "react";

interface backgroundProps {
    solidColors: string[];
    selectedBg: string;
    setSelectedBg: (color: string) => void;
    gradientColors: string[];
} 

const Background: React.FC<backgroundProps> = ({ selectedBg, solidColors, setSelectedBg, gradientColors }) => {
    return (
        <div>
            {/* Here I need to have grid of various different backgrounds */}
            {/* Have two groups */}
            {/* 1. for solid colors have multiple solid colors */}
            <div className="mb-4">
                <h1 className="font-semibold mb-2">Solid Colors</h1>
                <div className="grid grid-cols-8 gap-2">
                    {solidColors?.map((color) => (
                        <div
                            key={color}
                            className={`w-12 h-12 rounded cursor-pointer border transition-all duration-150 ${selectedBg === color ? 'ring-2 ring-blue-500 border-blue-500 scale-110' : 'border-gray-200'}`}
                            style={{ background: color }}
                            title={color}
                            onClick={() => setSelectedBg(color)}
                        />
                    ))}
                </div>
            </div>
            {/* 2. for various gradient colors */}
            <div>
                <h1 className="font-semibold mb-2">Gradient Colors</h1>
                <div className="grid grid-cols-5 gap-2">
                    {gradientColors.map((gradient, idx) => (
                        <div
                            key={idx}
                            className={`w-20 h-8 rounded cursor-pointer border transition-all duration-150 ${selectedBg === gradient ? 'ring-2 ring-blue-500 border-blue-500 scale-110' : 'border-gray-200'}`}
                            style={{ background: gradient }}
                            title={`Gradient ${idx+1}`}
                            onClick={() => setSelectedBg(gradient)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Background;