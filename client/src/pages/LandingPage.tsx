import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import KeyFeatures from '../components/KeyFeatures';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import MiniCTA from '../components/MiniCTA';
import Footer from '../components/Footer';
import TwitterDetail from '../components/TwitterDetail';
import PeerlistDetail from '../components/PeerlistDetail';
import ThreadsDetail from '../components/ThreadsDetail';    

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Hero />
            <VideoSection />
            <TwitterDetail />
            <PeerlistDetail />
            <ThreadsDetail />
            <KeyFeatures />
            <FAQ />
            <Pricing />
            <MiniCTA />
            <Footer />
        </div>
    );
};

export default LandingPage;