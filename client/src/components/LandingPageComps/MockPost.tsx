import { useState } from "react";
import FakeTweet from "../MockPosts/FakeTweet";
import { BiImageAdd } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import emptyDp from "../../assets/emptyDP.png";
import { useNavigate } from "react-router-dom";

const defaultData = {
    name: "Jane Doe",
    userHandle: "@jane",
    verified: true,
    profilePic: "",
    time: "12:37",
    date: "2025-09-22",
    appearance: "light",
    content: "Zapshot.in turns your content into polished, on-brand visuals in seconds. \n\n It supports all major social media platforms to get your social assets ready in seconds.",
    media: [] as string[],
    views: "8000",
    likes: "2000",
    comments: "39",
    retweets: "89",
    bookmarks: "86",
    coloredIcons: true,
    logo: "X",
    font: "Inter",
    theme: "light",
    mediaName: "",
    replies: [],
};

const MockPost = () => {
    const [twitterPostData, setTwitterPostData] = useState<typeof defaultData>({ ...defaultData });
    const handleInput = (key: keyof typeof defaultData, value: any) => {
        setTwitterPostData(prev => ({ ...prev, [key]: value }));
    };
    const navigate = useNavigate();

    const handleSignInClick = () => {
        localStorage.setItem('mock-data',JSON.stringify(twitterPostData));
        let token = localStorage.getItem('token');

        if (token) {
            navigate('/fake-posts-generator');
        } else {
            navigate('/signin?redirect=/fake-posts-generator')
        }
    }
    return (
        <div className="w-full h-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-center my-14 text-gray-800">Bring Your Ideas to Life with Mock Posts</h1>
            <div className="w-full max-w-3xl md:max-w-7xl h-auto mx-auto flex flex-col md:flex-row gap-4 md:gap-0">
                <div className="w-full md:w-1/2 rounded-2xl border p-6 flex flex-col justify-between md:mr-2 md:mb-0 mb-4">
                    <div>
                        <div className="flex items-center space-x-4 mb-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative group bg-white">
                                {twitterPostData.profilePic ? (
                                    <img src={twitterPostData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={emptyDp} alt="Profile-empty" className="w-full h-full object-cover" />
                                )}
                                <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center cursor-pointer transition-opacity">
                                    <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                const file = e.target.files[0];
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === 'string') {
                                                        setTwitterPostData(prev => ({ ...prev, profilePic: reader.result as string }));
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                    <div>
                                        <span className="block text-xs">Name</span>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={twitterPostData.name}
                                            onChange={e => handleInput("name", e.target.value)}
                                            className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32"
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-xs">Handle</span>
                                        <input
                                            type="text"
                                            placeholder="Handle"
                                            value={twitterPostData.userHandle}
                                            onChange={e => handleInput("userHandle", e.target.value)}
                                            className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap space-x-6 mb-4">
                            <div>
                                <span className="block text-xs mb-1">Time & date</span>
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        value={twitterPostData.date}
                                        onChange={e => handleInput("date", e.target.value)}
                                        className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32"
                                    />
                                    <input
                                        type="time"
                                        value={twitterPostData.time}
                                        onChange={e => handleInput("time", e.target.value)}
                                        className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24"
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Verified</span>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`text-xs ${!twitterPostData.verified ? "text-gray-800 font-medium" : "text-gray-400"}`}>Off</span>
                                    <button
                                        type="button"
                                        onClick={() => handleInput("verified", !twitterPostData.verified)}
                                        className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors duration-200 ${twitterPostData.verified ? "bg-black" : "bg-gray-200"}`}
                                    >
                                        <span className="sr-only">Enable verified</span>
                                        <span
                                            className={`inline-block h-4 w-4 transform bg-white rounded-full shadow transition duration-200 border border-gray-300 ${twitterPostData.verified ? "translate-x-5" : "translate-x-1"}`}
                                        />
                                    </button>
                                    <span className={`text-xs ${twitterPostData.verified ? "text-gray-800 font-medium" : "text-gray-400"}`}>On</span>
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Appearance</span>
                                <div className="flex items-center mt-1 border border-gray-300 rounded-md overflow-hidden">
                                    <button
                                        className={`px-4 py-1 text-sm focus:outline-none ${twitterPostData.theme === "light" ? "bg-black text-white" : "bg-white text-gray-800"}`}
                                        onClick={() => handleInput("theme", "light")}
                                    >
                                        Light
                                    </button>
                                    <button
                                        className={`px-4 py-1 text-sm focus:outline-none ${twitterPostData.theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"}`}
                                        onClick={() => handleInput("theme", "dark")}
                                    >
                                        Dark
                                    </button>
                                </div>
                            </div>
                        </div>
                        <textarea
                            className="w-full min-h-[150px] rounded-md border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none mb-3"
                            placeholder="What's happening?"
                            value={twitterPostData.content}
                            onChange={e => handleInput("content", e.target.value)}
                        />
                        {/* Media upload */}
                        <div className="mb-3">
                            {twitterPostData.media.length === 0 ? (
                                <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-[100px] flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                                    <BiImageAdd size={24} />
                                    <span className="text-xs">Click to upload image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                const file = e.target.files[0];
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === 'string') {
                                                        setTwitterPostData(prev => ({ ...prev, media: [reader.result as string] }));
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            ) : (
                                <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg px-2 py-2 mt-1 bg-white h-[100px]">
                                    <img src={twitterPostData.media[0]} alt="media" className="h-12 w-12 object-cover rounded mr-2" />
                                    <button
                                        className="text-xs text-red-500 ml-2 border border-red-300 rounded px-2 py-1 hover:bg-red-100"
                                        onClick={() => setTwitterPostData(prev => ({ ...prev, media: [] }))}
                                    >Remove</button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap space-x-6 mt-2">
                            <div>
                                <span className="block text-xs mb-1">Views</span>
                                <input
                                    type="number"
                                    placeholder="Views"
                                    value={twitterPostData.views}
                                    min={0}
                                    onChange={e => handleInput("views", e.target.value)}
                                    className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24 text-center"
                                />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Comments</span>
                                <input
                                    type="number"
                                    placeholder="Comments"
                                    value={twitterPostData.comments}
                                    min={0}
                                    onChange={e => handleInput("comments", e.target.value)}
                                    className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24 text-center"
                                />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Retweets</span>
                                <input
                                    type="number"
                                    placeholder="Retweets"
                                    value={twitterPostData.retweets}
                                    min={0}
                                    onChange={e => handleInput("retweets", e.target.value)}
                                    className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24 text-center"
                                />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Likes</span>
                                <input
                                    type="number"
                                    placeholder="Likes"
                                    value={twitterPostData.likes}
                                    min={0}
                                    onChange={e => handleInput("likes", e.target.value)}
                                    className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24 text-center"
                                />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Bookmarks</span>
                                <input
                                    type="number"
                                    placeholder="Bookmarks"
                                    value={twitterPostData.bookmarks}
                                    min={0}
                                    onChange={e => handleInput("bookmarks", e.target.value)}
                                    className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24 text-center"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={handleSignInClick}
                                className="mt-10 mx-auto rounded-full bg-black text-white font-semibold text-sm md:text-lg px-8 py-4 transition-all hover:bg-gray-900 shadow w-[70%] md:w-[60%]"
                                type="button"
                            >
                                Signin to Continue!
                            </button>
                        </div>
                    </div>
                </div>
                {/* Preview */}
                <div className="w-full md:w-1/2 p-6 flex items-center justify-center border rounded-2xl relative overflow-hidden" style={{ background:'linear-gradient(135deg, #facc15 0%, #10b981 100%)' }}>
                    {/* Watermark */}
                    <span
                        className="pointer-events-none select-none absolute left-1/2 top-1/2 text-[3rem] md:text-[5.5rem] font-extrabold text-gray-300 opacity-40"
                        style={{
                            transform: 'translate(-50%, -50%) rotate(-24deg)',
                            letterSpacing: '0.2em',
                            zIndex: 10,
                            userSelect: 'none',
                        }}
                    >
                        PREVIEW
                    </span>
                    <FakeTweet twitterPostData={twitterPostData} />
                </div>
            </div>
        </div>
    );
}

export default MockPost;