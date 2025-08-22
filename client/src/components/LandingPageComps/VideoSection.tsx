import React from "react";
import Video from "../../assets/threads-repost.mp4";


const VideoSection = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-center font-ibmSans text-3xl md:text-6xl font-bold">See it in Action!</h1>
      <div className="w-full flex justify-center mt-5">
        <div className="relative bg-white rounded-2xl shadow-2xl p-0 md:p-6 w-11/12 md:max-w-4xl flex flex-col items-end">
          <video
            src={Video}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl shadow-sm md:shadow-lg w-full h-auto sm:object-contain md:object-cover border border-gray-200 md:bg-[#b3d8f7]"
            style={{ minHeight: 360 }}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
