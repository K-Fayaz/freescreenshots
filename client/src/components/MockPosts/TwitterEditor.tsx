import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import { ImagePlus } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import emptyDP from "../../assets/emptyDP.png";

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
    font: string;
    coloredIcons: boolean;
    logo: string;
    theme:string;
    mediaName:string;
    replies: TwitterReply[];
}

interface FakeTwitterPostEditorProps {
    setTwitterPostData: React.Dispatch<React.SetStateAction<TwitterPostProps | null>>;
    twitterPostData: TwitterPostProps | null;
    setIsGif: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const FakeTwitterPostEditor: React.FC<FakeTwitterPostEditorProps> = ({ setTwitterPostData, twitterPostData, setIsGif }) => {

    const [date, setDate] = useState("2024-01-01");
    const [time, setTime] = useState("12:00");
    const [verified, setVerified] = useState(twitterPostData?.verified || false);
    const [appearance, setAppearance] = useState(twitterPostData?.theme);

    // Emoji picker state
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);

    // Close emoji picker on outside click (including textarea)
    useEffect(() => {
        if (!showEmojiPicker) return;
        const handleClick = (e: MouseEvent) => {
            const picker = emojiPickerRef.current;
            const button = emojiButtonRef.current;
            const textarea = textareaRef.current;
            if (
                picker && !picker.contains(e.target as Node) &&
                button && !button.contains(e.target as Node)
            ) {
                setShowEmojiPicker(false);
            } else if (textarea && textarea.contains(e.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showEmojiPicker]);


    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
        key: string
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (key === 'verified') {
            let newVal = !verified;
            setVerified(newVal);
            if (twitterPostData && setTwitterPostData) {
                setTwitterPostData({
                    ...twitterPostData,
                    verified: newVal,
                });
            }
            return;
        }

        if (key === 'coloredIcons') {
            if (twitterPostData && setTwitterPostData) {
                setTwitterPostData({
                    ...twitterPostData,
                    coloredIcons: !twitterPostData.coloredIcons,
                });
            }
            return;
        }

        // For input/text/textarea/select changes
        if ('target' in e && e.target && twitterPostData && setTwitterPostData) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            setTwitterPostData({
                ...twitterPostData,
                [key]: target.value,
            });
        }
    }

    return (
        <div>
            <div className="flex items-center space-x-8 mt-8">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative group bg-white">
                    {twitterPostData?.profilePic ? (
                        <img
                            src={twitterPostData.profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img 
                            src={emptyDP}
                            alt="Profile-empty"
                            className="w-full h-full object-cover"
                        />
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
                                        if (twitterPostData && setTwitterPostData) {
                                            setTwitterPostData({
                                                ...twitterPostData,
                                                profilePic: reader.result as string,
                                            });
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
                {/* Name and Handle */}
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-8">
                        <div>
                            <span className="block text-xs">Name</span>
                            <input type="text" value={twitterPostData?.name} onChange={(e) => handleOnChange(e, 'name')} className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40" />
                        </div>
                        <div>
                            <span className="block text-xs">Handle</span>
                            <input type="text" onChange={(e) => handleOnChange(e,'userHandle')} value={twitterPostData?.userHandle} className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* appearance, verified etc section */}
            <div className="flex items-center space-x-6 mt-8">
                {/* Date & Time */}
                <div>
                    <span className="block text-xs mb-1">Time & date</span>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            value={twitterPostData?.date || date}
                            onChange={e => {
                                setDate(e.target.value);
                                handleOnChange(e, 'date');
                            }}
                            className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32"
                        />
                        <input
                            type="time"
                            value={twitterPostData?.time || time}
                            onChange={e => {
                                setTime(e.target.value);
                                handleOnChange(e, 'time');
                            }}
                            className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-24"
                        />
                    </div>
                </div>
                {/* Verified toggle */}
                <div>
                    <span className="block text-xs mb-1">Verified</span>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs ${!verified ? "text-gray-800 font-medium" : "text-gray-400"}`}>Off</span>
                        <button
                            type="button"
                            onClick={(e) => handleOnChange(e, 'verified')}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors duration-200 ${verified ? "bg-black" : "bg-gray-200"}`}
                        >
                            <span className="sr-only">Enable verified</span>
                            <span
                                className={`inline-block h-4 w-4 transform bg-white rounded-full shadow transition duration-200 border border-gray-300 ${verified ? "translate-x-5" : "translate-x-1"}`}
                            />
                        </button>
                        <span className={`text-xs ${verified ? "text-gray-800 font-medium" : "text-gray-400"}`}>On</span>
                    </div>
                </div>
                {/* Appearance toggle */}
                <div>
                    <span className="block text-xs mb-1">Appearance</span>
                    <div className="flex items-center mt-1 border border-gray-300 rounded-md overflow-hidden">
                        <button
                            className={`px-4 py-1 text-sm focus:outline-none ${appearance === "light" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
                            onClick={() => {
                                setAppearance("light");
                                if (twitterPostData && setTwitterPostData) {
                                    setTwitterPostData({
                                        ...twitterPostData,
                                        theme: "light"
                                    });
                                }
                            }}
                        >
                            Light
                        </button>
                        <button
                            className={`px-4 py-1 text-sm focus:outline-none ${appearance === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
                            onClick={() => {
                                setAppearance("dark");
                                if (twitterPostData && setTwitterPostData) {
                                    setTwitterPostData({
                                        ...twitterPostData,
                                        theme: "dark"
                                    });
                                }
                            }}
                        >
                            Dark
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-6">
                {/* Font select */}
                <div>
                    <span className="block text-xs mb-1">Font</span>
                    <div className="relative">
                        <select
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            value={twitterPostData?.font || "Inter"}
                            onChange={e => handleOnChange(e, 'font')}
                        >
                            <option value="sans">Inter</option>
                            <option value="ibmSans">IBM Plex Sans</option>
                            <option value="noto">Noto Sans</option>
                            <option value="rubik">Rubik</option>
                            <option value="geistMono">Geist Mono</option>
                            <option value="poppins">Poppins</option>
                            <option value="imbMono">IBM Plex Mono</option>
                        </select>
                    </div>
                </div>

                {/* Colored icons toggle & Logo radio buttons in one row */}
                <div className="flex items-center space-x-8">
                    <div className="flex flex-col">
                        <span className="text-xs mr-2 mb-1">Show colored icons</span>
                        <div className="flex items-center text-xs">
                            <span className={`mr-2 ${twitterPostData?.coloredIcons ? 'text-gray-400':''}`}>Off</span>
                            <button
                                type="button"
                                onClick={e => handleOnChange(e, 'coloredIcons')}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full ${twitterPostData?.coloredIcons ? 'bg-black' : 'bg-gray-200'}`}
                                >
                                <span
                                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${twitterPostData?.coloredIcons ? 'translate-x-5' : 'translate-x-1'}`}
                                />
                            </button>
                            <span className={`ml-2 ${!twitterPostData?.coloredIcons ? 'text-gray-400':''}`}>On</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="flex flex-col items-center cursor-pointer">
                            <input
                                type="radio"
                                name="logo"
                                value="X"
                                checked={twitterPostData?.logo === 'X'}
                                onChange={e => handleOnChange(e, 'logo')}
                                className="hidden"
                            />
                            <span className={`p-2 rounded-lg border-2 ${twitterPostData?.logo === 'X' ? 'border-blue-500' : 'border-gray-200'}`}>
                                <FaXTwitter size={20}/>
                            </span>
                        </label>
                        <label className="flex flex-col items-center cursor-pointer">
                            <input
                                type="radio"
                                name="logo"
                                value="Twitter"
                                checked={twitterPostData?.logo === 'Twitter'}
                                onChange={e => handleOnChange(e, 'logo')}
                                className="hidden"
                            />
                            <span className={`p-2 rounded-lg border-2 ${twitterPostData?.logo === 'Twitter' ? 'border-blue-500' : 'border-gray-200'}`}>
                                <FaTwitter size={20} fill="#2798e5"/>
                            </span>
                        </label>
                        <label className="flex flex-col items-center cursor-pointer">
                            <input
                                type="radio"
                                name="logo"
                                value="None"
                                checked={twitterPostData?.logo === 'None'}
                                onChange={e => handleOnChange(e, 'logo')}
                                className="hidden"
                            />
                            <span className={`p-2 rounded-lg border-2 ${twitterPostData?.logo === 'None' ? 'border-blue-500' : 'border-gray-200'}`}>
                                <span className="text-xs text-gray-500">None</span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {/* Textarea */}
                <div className="relative">
                    <span className="block text-xs mb-1">Text</span>
                    <textarea
                        ref={textareaRef}
                        onChange={(e) => handleOnChange(e,'content')}
                        className="w-full min-h-[100px] rounded border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none pr-10"
                        placeholder="What's happening?"
                        value={twitterPostData?.content}
                        onClick={() => { if (showEmojiPicker) setShowEmojiPicker(false); }}
                    />
                    {/* Emoji icon button */}
                    <button
                        ref={emojiButtonRef}
                        type="button"
                        className="absolute bottom-2 right-2 text-gray-400 hover:text-yellow-500 text-xl p-1 bg-white rounded-full shadow"
                        onClick={() => setShowEmojiPicker((v) => !v)}
                        tabIndex={-1}
                    >
                        <FaRegSmile />
                    </button>
                    {/* Emoji Picker Floating */}
                    {showEmojiPicker && (
                        <div ref={emojiPickerRef} className="absolute z-50 bottom-12 right-0">
                            <EmojiPicker
                                autoFocusSearch
                                onEmojiClick={(emojiData) => {
                                    setShowEmojiPicker(false);
                                    if (twitterPostData && setTwitterPostData) {
                                        // Insert emoji at cursor position if possible, else append
                                        let content = twitterPostData.content || "";
                                        let emoji = emojiData.emoji;
                                        if (textareaRef.current) {
                                            const el = textareaRef.current;
                                            const start = el.selectionStart;
                                            const end = el.selectionEnd;
                                            content = content.slice(0, start) + emoji + content.slice(end);
                                            setTimeout(() => {
                                                el.focus();
                                                el.selectionStart = el.selectionEnd = start + emoji.length;
                                            }, 0);
                                        } else {
                                            content += emoji;
                                        }
                                        setTwitterPostData({
                                            ...twitterPostData,
                                            content,
                                        });
                                    }
                                }}
                                width={320}
                            />
                        </div>
                    )}
                </div>
                {/* Media Image Upload */}
                <div className="mt-6">
                    <span className="block text-xs mb-1">Media Image (optional)</span>
                    {/* If no image uploaded, show upload option */}
                    {!(twitterPostData?.media && twitterPostData.media.length > 0) && (
                        <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-[90px] flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <ImagePlus />
                            <span className="text-xs">Click to upload image</span>
                            <span className="text-xs">Image/Gif</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        // Check if file is a gif
                                        if (file.type === 'image/gif') {
                                            // Optionally, you can set a flag or handle GIFs differently
                                            if (setIsGif) setIsGif(true);
                                        } else {
                                            if (setIsGif) setIsGif(false);
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            if (twitterPostData && setTwitterPostData) {
                                                setTwitterPostData({
                                                    ...twitterPostData,
                                                    media: [reader.result as string],
                                                    mediaName: file.name,
                                                });
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    )}
                    {/* Show uploaded media filename with remove button */}
                    {twitterPostData?.media && twitterPostData.media.length > 0 && (
                        <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 mt-1 bg-white">
                            <ImagePlus className="text-gray-400 mr-2" />
                            <span className="text-gray-800 text-sm flex-1 truncate">{twitterPostData.mediaName || 'media.jpg'}</span>
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                    if (twitterPostData && setTwitterPostData) {
                                        setIsGif(false);
                                        setTwitterPostData({
                                            ...twitterPostData,
                                            media: [],
                                            mediaName: '',
                                        });
                                    }
                                }}
                            >
                                &#10005;
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats secctoin */}
            <div className="flex items-center justify-between space-x-4 mt-8">
                <div>
                    <span className="block text-xs mb-1">Views</span>
                    <input type="number" defaultValue={twitterPostData?.views} onChange={(e) => handleOnChange(e,'views')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Comments</span>
                    <input type="number" defaultValue={twitterPostData?.comments} onChange={(e) => handleOnChange(e,'comments')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Retweets</span>
                    <input type="number" defaultValue={twitterPostData?.retweets} onChange={(e) => handleOnChange(e,'retweets')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Likes</span>
                    <input type="number" defaultValue={twitterPostData?.likes} onChange={(e) => handleOnChange(e,'likes')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Bookmarks</span>
                    <input type="number" defaultValue={twitterPostData?.bookmarks} onChange={(e) => handleOnChange(e,'bookmarks')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20 text-center" />
                </div>
            </div>
        </div>
    );
}

export default FakeTwitterPostEditor;