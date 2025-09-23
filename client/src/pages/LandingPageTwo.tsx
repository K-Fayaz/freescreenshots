
import Hero from "../components/LandingPageComps/Hero";
import Navbar from "@/components/LandingPageComps/Navbar";
import VideoSection from "@/components/LandingPageComps/VideoSection";
import XHorizontalScrollSection from "@/components/LandingPageComps/XHorizontalScrollSection";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/LandingPageComps/FeedbackSection";
import BeforeAfter from "@/components/LandingPageComps/BeforeAfter";
import CTASection from "@/components/LandingPageComps/CTASection";
import MockPost from "@/components/LandingPageComps/MockPost";

const LandingPageTwo = () => {
  return (
    <div className="font-sans">
        <Navbar />
        <Hero/>
        <VideoSection />
        {/* <section className="w-full mx-auto">
          <BeforeAfter />
        </section> */}
        <XHorizontalScrollSection />
        <section className="w-full h-auto md:h-screen bg-gray-50">
          <MockPost />
        </section>
        <section id="faq" className="w-full grid place-items-center">
          <FAQ />
        </section>
        {/* <section id="pricing" className="w-full h-screen bg-gray-50"> */}
        <Pricing />
        <section className="w-full md:w-3/4 mx-auto">
          <CTASection />
        </section>
        {/* <FeedbackSection /> */}
        {/* </section> */}
        <Footer/>
    </div>
  );
}

export default LandingPageTwo;