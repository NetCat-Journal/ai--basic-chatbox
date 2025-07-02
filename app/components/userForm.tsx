'use client';
import React, { useState, useRef, useEffect } from 'react';

function UserForm() {
    type ChatMessage = {
        role: 'user' | 'assistant';
        content: string;
    };

    const [input, setInput] = useState('');
    const [conversations, setConversations] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const threshold = 100;
        const distanceFromBottom =
            container.scrollHeight - container.scrollTop - container.clientHeight;

        if (distanceFromBottom < threshold) {
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    }, [conversations]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        setConversations(prev => [...prev, { role: 'user', content: input }]);
        setIsLoading(true);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        setConversations(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setInput('');
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className=" flex overflow-y-auto, added px-4 py-2" ref={scrollContainerRef}>
                {conversations.map((msg, i) => (
                    <div
                        key={i}
                        className={`px-4 py-2 rounded-xl max-w-[75%] ${msg.role === 'user'
                            ? 'bg-[#fbc360] text-[#110828] self-start'
                            : 'bg-[#2d1f55] text-white self-end'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="px-4 py-2 rounded-xl max-w-[75%] bg-[#2d1f55] text-white self-end">
                        <div className='flex flex-row justify-center items-center text-[#fbc360] text-xl font-bold size-4 tracking-widest'>
                            <div className='animate-bounce' style={{ animationDelay: '0ms' }}>.</div>
                            <div className='animate-bounce' style={{ animationDelay: '200ms' }}>.</div>
                            <div className='animate-bounce' style={{ animationDelay: '300ms' }}>.</div>
                        </div>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className="mt-4 w-full border border-gray-300 rounded-2xl px-4 py-2 bg-[#1a1035]"
            >
                <div className="flex flex-row">
                    <input
                        type="text"
                        id="message"
                        name="message"
                        value={input}
                        required
                        onChange={handleChange}
                        className="flex-1 mr-2 bg-transparent outline-none text-white placeholder-gray-400"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? 'bg-gray-200' : 'bg-[#fbc360] hover:bg-[#efca85]'} text-[#110828] font-bold px-4 py-2 rounded-xl  tracking-wide`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;
