import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { Trash } from "lucide-react";

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

interface replyChainEditorProps {
    linkedInPostData: LinkedInPostProps | null;
    setLinkedInPostData: React.Dispatch<React.SetStateAction<LinkedInPostProps | null>>;
}

const ReplyChainEditor: React.FC<replyChainEditorProps> = ({ linkedInPostData, setLinkedInPostData }) => {
    const [reply, setReply] = useState<Reply>({
        comment: "",
        pfp: "",
        name: "",
        headline: "",
        likesCount: 0,
    });

    const handleAddReply = () => {
        if (!reply.name.trim() && !reply.comment.trim()) return;
        console.log(reply);
        if (setLinkedInPostData && linkedInPostData) {
            setLinkedInPostData({
                ...linkedInPostData,
                replies: [
                    ...(linkedInPostData?.replies || []),
                    reply,
                ],
            });
            setReply({ comment: "", pfp: "", name: "", headline: "", likesCount: 0 });
        }
    }

    return (
        <div>
            <div className="border-gray-400 border-2 border-dashed p-2 rounded-md">
                <div className="flex items-center space-x-4 mt-8">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative group bg-white">
                        {reply.pfp ? (
                            <img
                                src={reply.pfp}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <span className="text-2xl">🙂</span>
                            </div>
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
                                            setReply(prev => ({
                                                ...prev,
                                                pfp: reader.result as string,
                                            }));
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
                                <input
                                    type="text"
                                    value={reply.name || ''}
                                    onChange={e => setReply(prev => ({ ...prev, name: e.target.value }))}
                                    className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                />
                            </div>
                            <div>
                                <span className="block text-xs">Headline</span>
                                <input
                                    type="text"
                                    value={reply.headline || ''}
                                    onChange={e => setReply(prev => ({ ...prev, headline: e.target.value }))}
                                    className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                />
                            </div>
                            <div>
                                <span className="block text-xs">Likes</span>
                                <input
                                    type="number"
                                    value={reply.likesCount || 0}
                                    min={0}
                                    onChange={e => setReply(prev => ({ ...prev, likesCount: Number(e.target.value) }))}
                                    className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 relative">
                    <textarea
                        className="w-full min-h-[100px] rounded border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none pr-10"
                        placeholder="Reply to post"
                        value={reply.comment || ''}
                        onChange={e => setReply(prev => ({ ...prev, comment: e.target.value }))}
                    />
                    <BiSend onClick={handleAddReply} className="absolute bottom-3 right-3 text-gray-600 cursor-pointer hover:text-gray-800" size={25} title="submit"/>
                </div>
            </div>
            {/* Editable Replies List */}
            {linkedInPostData?.replies && linkedInPostData.replies.length > 0 && (
                <div className="mt-6 space-y-4">
                    {linkedInPostData.replies.map((r, idx) => (
                        <div key={idx} className="border-gray-400 border-2 border-dashed p-2 rounded-md flex flex-col relative">
                            <div className="flex items-center space-x-2 mt-2">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative group bg-white">
                                    {r.pfp ? (
                                        <img src={r.pfp} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            <span className="text-2xl">🙂</span>
                                        </div>
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
                                                        if (setLinkedInPostData && linkedInPostData) {
                                                            const newReplies = linkedInPostData.replies.map((item, i) => i === idx ? { ...item, pfp: reader.result as string } : item);
                                                            setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                {/* Name, Headline, Likes */}
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-8">
                                        <div>
                                            <span className="block text-xs">Name</span>
                                            <input
                                                type="text"
                                                value={r.name}
                                                onChange={e => {
                                                    if (setLinkedInPostData && linkedInPostData) {
                                                        const newReplies = linkedInPostData.replies.map((item, i) => i === idx ? { ...item, name: e.target.value } : item);
                                                        setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                                    }
                                                }}
                                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-xs">Headline</span>
                                            <input
                                                type="text"
                                                value={r.headline}
                                                onChange={e => {
                                                    if (setLinkedInPostData && linkedInPostData) {
                                                        const newReplies = linkedInPostData.replies.map((item, i) => i === idx ? { ...item, headline: e.target.value } : item);
                                                        setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                                    }
                                                }}
                                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-xs">Likes</span>
                                            <input
                                                type="number"
                                                value={r.likesCount}
                                                min={0}
                                                onChange={e => {
                                                    if (setLinkedInPostData && linkedInPostData) {
                                                        const newReplies = linkedInPostData.replies.map((item, i) => i === idx ? { ...item, likesCount: Number(e.target.value) } : item);
                                                        setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                                    }
                                                }}
                                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-20"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Delete button */}
                                <button
                                    className="text-red-500 text-xs border border-red-300 rounded p-2 rounded-full hover:bg-red-100 absolute top-2 right-2"
                                    onClick={() => {
                                        if (setLinkedInPostData && linkedInPostData) {
                                            const newReplies = linkedInPostData.replies.filter((_, i) => i !== idx);
                                            setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                        }
                                    }}
                                ><Trash size={14}/></button>
                            </div>
                            <div className="mt-3 relative">
                                <textarea
                                    className="w-full min-h-[100px] rounded border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none pr-10"
                                    placeholder="Reply to post"
                                    value={r.comment}
                                    onChange={e => {
                                        if (setLinkedInPostData && linkedInPostData) {
                                            const newReplies = linkedInPostData.replies.map((item, i) => i === idx ? { ...item, comment: e.target.value } : item);
                                            setLinkedInPostData({ ...linkedInPostData, replies: newReplies });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ReplyChainEditor;