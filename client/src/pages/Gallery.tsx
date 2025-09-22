
import Navbar from "@/components/LandingPageComps/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { LuConstruction } from "react-icons/lu";

const tabs = [
    'All platforms',
    'X',
    'Reddit',
    'Peerlist',
    'Youtube',
    'Product Hunt',
    'Instagram'
]

const Gallery = () => {
    const [selectedTab, setSelectedTab] = useState('All platforms');
    return (
        <div>
            <Navbar />
            <section className="w-full flex flex-col items-center mt-24 mb-24">
                <div className="mb-6">
                    <span className="inline-block bg-gray-300 font-semibold text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                    Gallery showcase<span className='text-md md:text-xl'>📸</span>
                    </span>
                </div>
                <h1 className="text-center text-8xl font-bold">
                    Explore the Zapshot <br/> Gallery 
                </h1>
                <p className="text-gray-500 text-center text-xl mt-5">See all the clean, distraction-free screenshots you can create in seconds.</p>
            </section>
            <section className="w-full flex justify-center mb-5">
                <div className="flex gap-4">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab}
                            onClick={()=> setSelectedTab(tab)}
                            className={
                                `px-6 py-2 rounded-full font-medium text-sm transition-colors shadow-sm ` +
                                (selectedTab === tab
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                            }
                        >
                            {tab === 'All platforms' ? 'All Platforms' : tab}
                        </button>
                    ))}
                </div>
            </section>
            <section className="my-10">
                <div className="flex justify-center items-center"> 
                    <LuConstruction fill="#e0c944ff" className="mr-2" size={36} />
                    <h1>This page is under Construction. Please don't judge it....... yet</h1>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Gallery;