import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { Trash } from "lucide-react";

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

interface TwitterReplyChainProps {
    twitterPostData: TwitterPostProps | null;
    setTwitterPostData: React.Dispatch<React.SetStateAction<TwitterPostProps | null>>;
}


const TwitterReplyChain: React.FC<TwitterReplyChainProps> = ({ twitterPostData, setTwitterPostData }) => {
    const [reply, setReply] = useState<TwitterReply>({
        name: "",
        userHandle: "",
        pfp: "",
        comment: "",
        likesCount: 0,
        retweets: 0,
        comments: 0,
    });

    const handleAddReply = () => {
        if (!reply.name.trim() && !reply.comment.trim()) return;
        if (setTwitterPostData && twitterPostData) {
            setTwitterPostData({
                ...twitterPostData,
                replies: [
                    ...(twitterPostData?.replies || []),
                    reply,
                ],
            });
            setReply({ name: "", userHandle: "", pfp: "", comment: "", likesCount: 0, retweets: 0, comments: 0 });
        }
    };

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
                    {/* Name, Handle, Likes, Retweets, Comments */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-4">
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
                                <span className="block text-xs">Handle</span>
                                <input
                                    type="text"
                                    value={reply.userHandle || ''}
                                    onChange={e => setReply(prev => ({ ...prev, userHandle: e.target.value }))}
                                    className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <div>
                        <span className="block text-xs">Likes</span>
                        <input
                            type="number"
                            value={reply.likesCount || 0}
                            min={0}
                            onChange={e => setReply(prev => ({ ...prev, likesCount: Number(e.target.value) }))}
                            className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                        />
                    </div>
                    <div>
                        <span className="block text-xs">Retweets</span>
                        <input
                            type="number"
                            value={reply.retweets || 0}
                            min={0}
                            onChange={e => setReply(prev => ({ ...prev, retweets: Number(e.target.value) }))}
                            className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                        />
                    </div>
                    <div>
                        <span className="block text-xs">Comments</span>
                        <input
                            type="number"
                                value={reply.comments || 0}
                                min={0}
                                onChange={e => setReply(prev => ({ ...prev, comments: Number(e.target.value) }))}
                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                            />
                        </div>
                </div>
                <div className="mt-5 relative">
                    <textarea
                        className="w-full min-h-[100px] rounded border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none pr-10"
                        placeholder="Reply to tweet"
                        value={reply.comment || ''}
                        onChange={e => setReply(prev => ({ ...prev, comment: e.target.value }))}
                    />
                    <BiSend onClick={handleAddReply} className="absolute bottom-3 right-3 text-gray-600 cursor-pointer hover:text-gray-800" size={25} title="submit"/>
                </div>
            </div>
            {/* Editable Replies List */}
            {twitterPostData?.replies && twitterPostData.replies.length > 0 && (
                <div className="mt-6 space-y-4">
                    {twitterPostData.replies.map((r, idx) => (
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
                                                        if (setTwitterPostData && twitterPostData) {
                                                            const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, pfp: reader.result as string } : item);
                                                            setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                {/* Name, Handle, Likes, Retweets, Comments */}
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-4">
                                        <div>
                                            <span className="block text-xs">Name</span>
                                            <input
                                                type="text"
                                                value={r.name}
                                                onChange={e => {
                                                    if (setTwitterPostData && twitterPostData) {
                                                        const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, name: e.target.value } : item);
                                                        setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                                    }
                                                }}
                                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-xs">Handle</span>
                                            <input
                                                type="text"
                                                value={r.userHandle}
                                                onChange={e => {
                                                    if (setTwitterPostData && twitterPostData) {
                                                        const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, userHandle: e.target.value } : item);
                                                        setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                                    }
                                                }}
                                                className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Delete button */}
                                <button
                                    className="text-red-500 text-xs border border-red-300 rounded p-2 rounded-full hover:bg-red-100 absolute top-2 right-2"
                                    onClick={() => {
                                        if (setTwitterPostData && twitterPostData) {
                                            const newReplies = twitterPostData.replies.filter((_, i) => i !== idx);
                                            setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                        }
                                    }}
                                ><Trash size={14}/></button>
                            </div>
                            <div className="flex space-x-2">
                                <div>
                                    <span className="block text-xs">Likes</span>
                                    <input
                                        type="number"
                                        value={r.likesCount}
                                        min={0}
                                        onChange={e => {
                                            if (setTwitterPostData && twitterPostData) {
                                                const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, likesCount: Number(e.target.value) } : item);
                                                setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                            }
                                        }}
                                        className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                    />
                                </div>
                                <div>
                                    <span className="block text-xs">Retweets</span>
                                    <input
                                        type="number"
                                        value={r.retweets}
                                        min={0}
                                        onChange={e => {
                                            if (setTwitterPostData && twitterPostData) {
                                                const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, retweets: Number(e.target.value) } : item);
                                                setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                            }
                                        }}
                                        className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                    />
                                </div>
                                <div>
                                    <span className="block text-xs">Comments</span>
                                    <input
                                        type="number"
                                        value={r.comments}
                                        min={0}
                                        onChange={e => {
                                            if (setTwitterPostData && twitterPostData) {
                                                const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, comments: Number(e.target.value) } : item);
                                                setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                            }
                                        }}
                                        className="mt-1 px-3 py-1 rounded border border-gray-300 text-gray-800 text-sm focus:outline-none w-40"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 relative">
                                <textarea
                                    className="w-full min-h-[100px] rounded border border-gray-300 text-gray-800 text-sm focus:outline-none p-3 resize-none pr-10"
                                    placeholder="Reply to tweet"
                                    value={r.comment}
                                    onChange={e => {
                                        if (setTwitterPostData && twitterPostData) {
                                            const newReplies = twitterPostData.replies.map((item, i) => i === idx ? { ...item, comment: e.target.value } : item);
                                            setTwitterPostData({ ...twitterPostData, replies: newReplies });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TwitterReplyChain;