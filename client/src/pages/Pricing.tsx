import Footer from "@/components/Footer";
import Navbar from "@/components/LandingPageComps/Navbar";
import Pricing from "@/components/Pricing";


const PricingPage = () => {
    return(
        <div>
            <Navbar page="not-landing"/>
            <section className="w-full flex flex-col items-center mt-12 mb-12">
                <div className="mb-6">
                    <span className="inline-block bg-gray-300 font-semibold text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                    Cheaper than a coffee <span className='text-md md:text-xl'>☕</span>, but way more useful
                    </span>
                </div>
                <h1 className="text-center text-4xl md:text-8xl font-bold">
                    Simple, Affordable <br/> Pricing
                </h1>
                <p className="text-gray-500 text-center text-xl mt-5">Only pay for what you need. No subscriptions, no hidden fees.</p>
            </section>
            <div>
                <Pricing page="not-landing"/>
            </div>
            <Footer />
        </div>
    )
};

export default PricingPage;