import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    let token = localStorage.getItem('token');
    if (token) {
      return navigate('/screenshot');
    }
    return navigate('/signin');
  }
  return (
    <div className="bg-gradient-to-br from-black to-gray-800 py-14 px-6 rounded-3xl mx-4 my-8 relative">
      <div className="absolute inset-0 pointer-events-none scale-110">
        <div className={`absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]`} />
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Your First 5 Screenshots are on Us!
        </h2>
        
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Get 5 pixel-perfect screenshots from any supported social media platform with no watermarks for free.
        </p>
        
        <button onClick={handleNavigate} className="py-4 px-8 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-black text-white shadow-lg hover:shadow-xl">
          Claim Your Free Credits
        </button>
      </div>
    </div>
  );
};

export default CTASection;