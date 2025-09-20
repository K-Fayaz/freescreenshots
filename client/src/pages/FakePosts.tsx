
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import BASE_URL from "@/config";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import FakeTwitterPostEditor from "@/components/MockPosts/TwitterEditor";
import { Download } from "lucide-react";
import * as htmlToImage from 'html-to-image';
import FakeTweet from "@/components/MockPosts/FakeTweet";
import GetProModal from "../components/GetProModal";
import Background from "@/components/MockPosts/Background";
import FakeLinkedInPostEditor from "@/components/MockPosts/FakeLinkedInPostEditor";
import FakeLinkedInPost from "@/components/MockPosts/FakeLinkedInPost";
import ReplyChainEditor from "@/components/MockPosts/ReplyChainEditor";
import TwitterReplyChain from "@/components/MockPosts/TwitterReplyChain";

interface userDetails {
  credits: number;
  avatar: string;
}

interface Reply {
    comment: string;
    pfp: string;
    name: string;
    headline: string;
    likesCount: number;
}

interface TwitterReply {
    name: string;
    userHandle: string;
    pfp: string;
    comment: string;
    likesCount: number;
    retweets: number;
    comments: number;
}

interface TwitterPostProps {
    name: string;
    userHandle: string;
    verified: boolean;
    profilePic: string;
    time: string;
    date: string;
    appearance: string;
    content: string;
    media: string[];
    views: string;
    likes: string;
    comments: string;
    retweets: string;
    bookmarks: string;
    coloredIcons: boolean;
    logo: string;
    font: string;
    theme: string;
    mediaName: string;
    replies: TwitterReply[];
}

let initialValue = {
    name: 'Elon Musk',
    userHandle: '@elonmusk',
    verified: true,
    profilePic: '',
    time: '12:33',
    date:'2025-09-11',
    appearance: 'Light',
    content: 'Launching new rocket on next wednesday, To the MOON!',
    media: [],
    views: '120000',
    likes: '8000',
    comments: '5300',
    retweets: '1600',
    bookmarks: '409',
    coloredIcons: true,
    logo: 'X',
    font: 'ibmSans',
    theme: 'light',
    mediaName: '',
    replies: []
}

interface LinkedInPostProps {
    name: string;
    headline: string;
    verified: boolean;
    profilePic: string;
    time: string;
    date: string;
    appearance: string;
    content: string;
    media: string[];
    views: string;
    likes: string;
    comments: string;
    reposts: string;
    bookmarks: string;
    font: string;
    coloredIcons: boolean;
    logo: string;
    theme: string;
    mediaName: string;
    replies: Reply[];
}

let initialLinkedinValue = {
    name: "Ranbeer Kapoor",
    headline: "Product Manager @ Microsoft | Driving AI-powered solutions | Ex-Startup Founder | Speaker on Innovation & Strategy",
    verified: true,
    profilePic: "",
    time: "12:55",
    date: "2025-09-11",
    appearance: "light",
    content: "Thrilled to share that our team has just launched a new AI feature that will transform the way businesses interact with customers. \n\n Grateful for the hard work, collaboration, and late nights that made this possible!",
    media: [],
    views: "1200",
    likes: "998",
    comments: "35",
    reposts: "9",
    bookmarks: "",
    font: "ibmSans",
    coloredIcons: true,
    logo: "Linkedin",
    theme: "light",
    mediaName: "",
    replies:[]
}

const solidColors = [
    '#ffffff', 
    '#f87171', 
    '#fbbf24', 
    '#34d399', 
    '#60a5fa', 
    '#a78bfa', 
    '#f472b6', 
    '#111827', 
    // '#e5e7eb', 
    '#facc15', 
    '#10b981', 
    '#2563eb',
    '#0ea5e9', // Sky Blue
    '#14b8a6', // Teal
    '#9333ea', // Deep Purple
    '#f43f5e', // Rose
    '#fb7185', // Light Rose
    '#22c55e', // Bright Green
    '#ef4444', // Strong Red
    '#f97316', // Orange
    '#c084fc', // Lavender
    '#06b6d4', // Cyan
    '#3b82f6', // Bright Blue
    '#64748b', // Slate Gray
    '#1e293b', // Dark Slate
    '#d1d5db', // Light Gray
    // '#f5f3ff', // Soft Violet Background
    '#fb923c', // Warm Orange
    '#f59e0b', // Golden Amber
    '#65a30d', // Olive Green
    '#4ade80', // Fresh Lime
    '#2dd4bf', // Aqua
    '#0f766e', // Deep Teal
    '#1d4ed8', // Strong Blue
    '#7dd3fc', // Light Sky
    '#be185d', // Bold Magenta
    '#701a75'  // Rich Plum
];

const gradientColors = [
    "linear-gradient(135deg, #e5e7eb 0%, #fafaf9 100%)",
    'linear-gradient(135deg, #f87171 0%, #fbbf24 100%)',
    'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
    'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
    'linear-gradient(135deg, #facc15 0%, #10b981 100%)',
    'linear-gradient(135deg, #2563eb 0%, #a78bfa 100%)',
    'linear-gradient(135deg, #f472b6 0%, #f87171 100%)',
    "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
    "linear-gradient(135deg, #a78bfa 0%, #9333ea 100%)",
    "linear-gradient(135deg, #f472b6 0%, #f43f5e 100%)",
    "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    "linear-gradient(135deg, #22c55e 0%, #65a30d 100%)",
    "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
    "linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)",
    "linear-gradient(135deg, #7dd3fc 0%, #0ea5e9 100%)",
    "linear-gradient(135deg, #be185d 0%, #701a75 100%)",
    "linear-gradient(135deg, #c084fc 0%, #a78bfa 100%)",
    "linear-gradient(135deg, #4ade80 0%, #2dd4bf 100%)",
    "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    "linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)"

];

const FakePost = () => {
    const navigate = useNavigate();
    const [userDetails,setUserDetails] = useState<userDetails | null>(null);
    const [twitterPostData, setTwitterPostData] = useState<TwitterPostProps | null>(initialValue);
    const [linkedInPostData, setLinkedInPostData] = useState<LinkedInPostProps | null>(initialLinkedinValue);
    // Tab state for Content/Background
    const [selectedTab, setSelectedTab] = useState<'Content' | 'Background' | 'Reply'>("Content");
    // State for selected background (color or gradient)
    const [selectedBg, setSelectedBg] = useState<string>(solidColors[3]);
    const postRef = useRef<HTMLDivElement>(null);
    const [isProModalOpen,setIsProModalOpen] = useState(false);
    const [showPlans, setShowPlans] = useState(false);
    const [selectedPlatform,setSelectedPlatform] = useState<string>('X');

    const fontMap: Record<string, string> = {
        Inter: 'font-sans',
        ibmSans: 'font-ibmSans',
        noto: 'font-noto',
        rubik: 'font-rubik',
        geistMono: 'font-geistMono',
        poppins: 'font-poppins',
        imbMono: 'font-imbMono',
    };
    const fontClass = selectedPlatform === 'LinkedIn'
        ? (fontMap[linkedInPostData?.font || 'Inter'] || 'font-sans')
        : (fontMap[twitterPostData?.font || 'Inter'] || 'font-sans');

    // Download handler with loading state
    const [downloading, setDownloading] = useState(false);
    const handleDownload = async () => {
        if (!postRef.current) return;

        let url = `${BASE_URL}api/user/fake-post-download`;
        setDownloading(true);
        axios({
            url,
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(async (response) => {
            if(response.status == 200) {
                try {
                    const dataUrl = await htmlToImage.toPng(postRef?.current, { cacheBust: true, backgroundColor: undefined });
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    let postName = selectedPlatform == 'X' ? 'tweet.png' : 'linkedinpost.png';
                    link.download = postName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (err) {
                    alert('Failed to download image.');
                } finally {
                    setDownloading(false);
                }
            }
        })
        .catch((err) => {
            console.log(err);
            if(err.response.status == 400) {
                console.log("Credits exhaused!");
                setIsProModalOpen(true);
                setShowPlans(true);
            }
        })
        .finally(() => {
            setDownloading(false);
        })
    };
    
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
    
        axios({
          url:`${BASE_URL}api/user/get`,
          method:"GET",
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            setUserDetails({
              avatar: response?.data?.profile || '',
              credits: response?.data?.credits || 0
            }); 
          } else if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
    
            return navigate('/signin');
          }
        })
        .catch((err) => {
          console.log(err);
    
          if (err?.response?.status == 401 || err.response?.status == 404) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
    
            return navigate('/signin');
          }
        })
    }, []);

    return (
        <div className="h-screen">
            <header className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <Home size={20} />
                        <span>Home</span>
                    </button>
                    </div>
                    
                    {
                        userDetails && userDetails?.credits >= 0 && (
                            <div title='Available credits' className='flex justify-between items-end rounded-full bg-gray-300 '>
                                <h1 className='px-2 py-1'>
                                    {userDetails?.credits.toString()} credits available
                                </h1>
                            </div>
                        )
                    }
                </div>
            </header>

            <main className="w-full flex h-auto min-h-[93%]">
                <section className="basis-[35%] h-[93%] overflow-y-auto border-r">
                    <div className="mt-5">
                        {/* <h1 className="ml-5 text-sm">Choose Platform</h1> */}
                        <div className="w-[90%] mx-auto flex mt-3">
                            <section onClick={() => setSelectedPlatform('X')} className={`w-12 h-12 rounded-md grid place-items-center cursor-pointer ${selectedPlatform == 'X' ? 'border border-black':''}`}>
                                <FaSquareXTwitter size={28} />
                            </section>

                            <section onClick={() => setSelectedPlatform('LinkedIn')} className={`w-12 h-12 rounded-md grid place-items-center ml-3 cursor-pointer ${selectedPlatform == 'LinkedIn' ? 'border border-black':''}`}>
                                <div className="relative group w-full h-full flex items-center justify-center">
                                    <FaLinkedin size={28} />
                                </div>
                            </section>

                            <section className="w-12 h-12 border border-gray-200 rounded-md grid place-items-center ml-3 opacity-50 cursor-not-allowed">
                                <div className="relative group w-full h-full flex items-center justify-center" title="coming soon...">
                                    <FaInstagramSquare size={28} />
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="w-[90%] mx-auto mt-5">
                        {/* Tabs for Content and Background */}
                        <div className="flex border-b border-gray-200 mb-2">
                            <button
                                className={`px-4 py-2 font-medium focus:outline-none transition-colors duration-150 ${selectedTab === 'Content' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                                onClick={() => setSelectedTab('Content')}
                            >
                                Content
                            </button>
                            <button
                                className={`ml-4 px-4 py-2 font-medium focus:outline-none transition-colors duration-150 ${selectedTab === 'Reply' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                                onClick={() => setSelectedTab('Reply')}
                            >
                                Replies
                            </button>
                            <button
                                className={`ml-4 px-4 py-2 font-medium focus:outline-none transition-colors duration-150 ${selectedTab === 'Background' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                                onClick={() => setSelectedTab('Background')}
                            >
                                Background
                            </button>
                        </div>
                    </div>
                    {/* User Profile Card */}
                    <div className="w-[90%] mx-auto mt-3">
                        {
                            selectedTab === 'Content' ? (
                                selectedPlatform == 'X' ? (
                                    <FakeTwitterPostEditor setTwitterPostData={setTwitterPostData} twitterPostData={twitterPostData}/>
                                ) : selectedPlatform == 'LinkedIn' ? (
                                    <FakeLinkedInPostEditor setLinkedInPostData={setLinkedInPostData} linkedInPostData={linkedInPostData}/>
                                ) : null
                            ) : selectedTab == 'Background' ? (
                                <Background selectedBg={selectedBg} setSelectedBg={setSelectedBg} gradientColors={gradientColors} solidColors={solidColors}/>
                            ) : selectedTab == 'Reply' ? (
                                selectedPlatform == 'LinkedIn' ? (
                                    <ReplyChainEditor setLinkedInPostData={setLinkedInPostData} linkedInPostData={linkedInPostData}/>
                                ) : selectedPlatform  == 'X' ? (
                                    <TwitterReplyChain twitterPostData={twitterPostData} setTwitterPostData={setTwitterPostData}/>
                                ) : null
                            ) : null
                        }
                    </div>

                    <div className="w-[90%] mx-auto mt-3 mb-4 flex justify-between">
                        <section className="bg-black rounded-md basis-[98%] text-sm flex items-center justify-center text-white p-2">
                            <button className="flex items-center" onClick={handleDownload} disabled={downloading}>
                                {downloading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                ) : (
                                    <Download size={15} className="mr-3"/>
                                )}
                                {downloading ? 'Exporting...' : 'Export'}
                            </button>
                        </section>
                        {/* <button className="rounded-md basis-[48%] text-sm flex items-center justify-center p-2 border boder-gray-500">
                            Next
                        </button> */}
                    </div>
                </section>

                {/* Font map for dynamic font class */}
                <section className={`basis-[65%] overflow-y-scroll grid place-items-center ${fontClass}`}>
                    <div
                        className="w-[70%] p-10 h-auto min-h-[60%] grid place-items-center rounded-2xl"
                        style={{ background: selectedBg }}
                        ref={postRef}
                    >
                        {
                            selectedPlatform == 'X' ? (
                                <FakeTweet twitterPostData={twitterPostData}/>
                            ) : selectedPlatform == 'LinkedIn' ? (
                                <FakeLinkedInPost linkedInPostData={linkedInPostData}/>
                            ) : null
                        }
                    </div>
                </section>
            </main>
            <GetProModal isOpen={isProModalOpen} showPlans={showPlans} onClose={() => setIsProModalOpen(false)} plan={''} />
        </div>
    )
}

export default FakePost;