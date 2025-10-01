
import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import { ImagePlus } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import emptyDP from "../../assets/emptyDP.png";

interface Reply {
    comment: string;
    pfp: string;
    name: string;
    headline: string;
    likesCount: number;
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

interface FakeLinkedInPostEditorProps {
    setLinkedInPostData: React.Dispatch<React.SetStateAction<LinkedInPostProps | null>>;
    linkedInPostData: LinkedInPostProps | null;
    setIsGif: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const FakeLinkedInPostEditor: React.FC<FakeLinkedInPostEditorProps> = ({ setLinkedInPostData, linkedInPostData, setIsGif }) => {
    const [date, setDate] = useState("2024-01-01");
    const [time, setTime] = useState("12:00");
    const [verified, setVerified] = useState(linkedInPostData?.verified || false);
    const [appearance, setAppearance] = useState(linkedInPostData?.theme);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);

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
            if (linkedInPostData && setLinkedInPostData) {
                setLinkedInPostData({
                    ...linkedInPostData,
                    verified: newVal,
                });
            }
            return;
        }

        if (key === 'coloredIcons') {
            if (linkedInPostData && setLinkedInPostData) {
                setLinkedInPostData({
                    ...linkedInPostData,
                    coloredIcons: !linkedInPostData.coloredIcons,
                });
            }
            return;
        }

        // For input/text/textarea/select changes
        if ('target' in e && e.target && linkedInPostData && setLinkedInPostData) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            setLinkedInPostData({
                ...linkedInPostData,
                [key]: target.value,
            });
        }
    }

    return (
        <div>
            <div className="flex items-center space-x-8 mt-8">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative group bg-white">
                    {linkedInPostData?.profilePic ? (
                        <img
                            src={linkedInPostData.profilePic}
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
                                        if (linkedInPostData && setLinkedInPostData) {
                                            setLinkedInPostData({
                                                ...linkedInPostData,
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
                {/* Name and Headline */}
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-8">
                        <div>
                            <span className="block text-xs">Name</span>
                            <input type="text" value={linkedInPostData?.name} onChange={(e) => handleOnChange(e, 'name')} className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40" />
                        </div>
                        <div>
                            <span className="block text-xs">Headline</span>
                            <input type="text" onChange={(e) => handleOnChange(e,'headline')} value={linkedInPostData?.headline} className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40" />
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
                            value={linkedInPostData?.date || date}
                            onChange={e => {
                                setDate(e.target.value);
                                handleOnChange(e, 'date');
                            }}
                            className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32"
                        />
                        <input
                            type="time"
                            value={linkedInPostData?.time || time}
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
                    <span className="block text-xs mb-1">Premium Badge</span>
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
                            className={`px-4 py-1 text-sm focus:outline-none ${appearance === "light" ? "bg-black text-white" : "bg-white text-gray-800"}`}
                            onClick={() => {
                                setAppearance("light");
                                if (linkedInPostData && setLinkedInPostData) {
                                    setLinkedInPostData({
                                        ...linkedInPostData,
                                        theme: "light"
                                    });
                                }
                            }}
                        >
                            Light
                        </button>
                        <button
                            className={`px-4 py-1 text-sm focus:outline-none ${appearance === "dark" ? "bg-black text-white" : "bg-white text-gray-800"}`}
                            onClick={() => {
                                setAppearance("dark");
                                if (linkedInPostData && setLinkedInPostData) {
                                    setLinkedInPostData({
                                        ...linkedInPostData,
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
                            value={linkedInPostData?.font || "Inter"}
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
                            <span className={`mr-2 ${linkedInPostData?.coloredIcons ? 'text-gray-400':''}`}>Off</span>
                            <button
                                type="button"
                                onClick={e => handleOnChange(e, 'coloredIcons')}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full ${linkedInPostData?.coloredIcons ? 'bg-black' : 'bg-gray-200'}`}
                                >
                                <span
                                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${linkedInPostData?.coloredIcons ? 'translate-x-5' : 'translate-x-1'}`}
                                />
                            </button>
                            <span className={`ml-2 ${!linkedInPostData?.coloredIcons ? 'text-gray-400':''}`}>On</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="flex flex-col items-center cursor-pointer">
                            <input
                                type="radio"
                                name="logo"
                                value="LinkedIn"
                                checked={linkedInPostData?.logo === 'LinkedIn'}
                                onChange={e => handleOnChange(e, 'logo')}
                                className="hidden"
                            />
                            <span className={`p-2 rounded-lg border-2 ${linkedInPostData?.logo === 'LinkedIn' ? 'border-blue-500' : 'border-gray-200'}`}>
                                <FaLinkedin size={20} fill="#0077b5"/>
                            </span>
                        </label>
                        <label className="flex flex-col items-center cursor-pointer">
                            <input
                                type="radio"
                                name="logo"
                                value="None"
                                checked={linkedInPostData?.logo === 'None'}
                                onChange={e => handleOnChange(e, 'logo')}
                                className="hidden"
                            />
                            <span className={`p-2 rounded-lg border-2 ${linkedInPostData?.logo === 'None' ? 'border-blue-500' : 'border-gray-200'}`}>
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
                        placeholder="What do you want to talk about?"
                        value={linkedInPostData?.content}
                        onClick={() => { if (showEmojiPicker) setShowEmojiPicker(false); }}
                    />
                    {/* Emoji icon button */}
                    <button
                        ref={emojiButtonRef}
                        type="button"
                        className="absolute bottom-2 right-2 text-gray-400 hover:text-blue-500 text-xl p-1 bg-white rounded-full shadow"
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
                                    if (linkedInPostData && setLinkedInPostData) {
                                        let content = linkedInPostData.content || "";
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
                                        setLinkedInPostData({
                                            ...linkedInPostData,
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
                    {!(linkedInPostData?.media && linkedInPostData.media.length > 0) && (
                        <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-[90px] flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <ImagePlus />
                            <span className="text-xs">Click to upload image</span>
                            <span className="text-xs">PNG, JPG up to 5MB</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        if (file.type === 'image/gif') {
                                            // Optionally, you can set a flag or handle GIFs differently
                                            if (setIsGif) setIsGif(true);
                                        } else {
                                            if (setIsGif) setIsGif(false);
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            if (linkedInPostData && setLinkedInPostData) {
                                                setLinkedInPostData({
                                                    ...linkedInPostData,
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
                    {linkedInPostData?.media && linkedInPostData.media.length > 0 && (
                        <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 mt-1 bg-white">
                            <ImagePlus className="text-gray-400 mr-2" />
                            <span className="text-gray-800 text-sm flex-1 truncate">{linkedInPostData.mediaName || 'media.jpg'}</span>
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                    if (linkedInPostData && setLinkedInPostData) {
                                        setIsGif(false);
                                        setLinkedInPostData({
                                            ...linkedInPostData,
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

            {/* Stats section */}
            <div className="flex items-center justify-between space-x-4 mt-8">
                <div>
                    <span className="block text-xs mb-1">Likes</span>
                    <input type="number" defaultValue={linkedInPostData?.likes} onChange={(e) => handleOnChange(e,'likes')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Comments</span>
                    <input type="number" defaultValue={linkedInPostData?.comments} onChange={(e) => handleOnChange(e,'comments')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32 text-center" />
                </div>
                <div>
                    <span className="block text-xs mb-1">Reposts</span>
                    <input type="number" defaultValue={linkedInPostData?.reposts} onChange={(e) => handleOnChange(e,'reposts')} className="px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-32 text-center" />
                </div>
            </div>
        </div>
    );
}

export default FakeLinkedInPostEditor;