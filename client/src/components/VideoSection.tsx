import Video from "../assets/threads-repost.mp4";

const VideoSection = () => {
  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how easy it is to create stunning branded screenshots from your social media posts
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg shadow-2xl"
              style={{ minHeight: '600px' }}
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection; 