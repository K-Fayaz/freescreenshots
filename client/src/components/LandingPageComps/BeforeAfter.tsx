
import BeforeAfterSlider from "./BeforeAfterSlider";
import "./button.css";
import { useNavigate } from "react-router-dom";

const BeforeAfter = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        let token = localStorage.getItem('token') || undefined;
        
        if (token) {
            navigate('/screenshot');
            return;
        }
        
        navigate('/signin');
    }
    return (
        <div className="w-3/4 mx-auto h-[600px] flex sm:flex-col md:flex-row md:justify-between mt-8">
            <div className="basis-[55%] rounded-xl p-8 flex flex-col justify-start">
                <h1 className="md:text-5xl text-2xl font-extrabold mb-4 font-sans text-black">Why Use Zapshot Instead of Manual Screenshots</h1>
                {/* <h3 className="text-xl font-extrabold mb-4 font-sans text-black">Turn messy screenshots into share-ready visuals in seconds.</h3> */}
                <h2 className="md:text-xl text-lg font-bold mt-2 mb-1 font-sans text-black">Manual Screenshots</h2>
                <ul className="mb-4 ml-4 space-y-1">
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">✂️</span>Cropped edges and clutter</li>
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">🖌️</span>Extra editing needed</li>
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">😒</span>Inconsistent look</li>
                </ul>
                <h2 className="md:text-xl text-lg font-bold mt-2 mb-1 font-sans text-black">Zapshot Screenshot</h2>
                <ul className="ml-4 space-y-1">
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">✅</span>Clean and distraction-free</li>
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">⚡</span>Ready to share instantly</li>
                    <li className="flex items-center text-base font-medium text-black text-lg"><span className="mr-2">⭐</span>Consistent, professional design</li>
                </ul>

                <button onClick={handleClick} className="slider-button-897 w-[250px] mt-10">
                    Try Zapshot for free
                </button>
            </div>
            <div className="basis-[45%] rounded-xl ml-4 flex items-center justify-center">
                <BeforeAfterSlider />
            </div>
        </div>
    )
};



export default BeforeAfter;