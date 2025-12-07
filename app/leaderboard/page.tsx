'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { IHallOfShame } from '@/models/HallOfShame';
import html2canvas from 'html2canvas';
import ShareCard from '../components/ui/ShareCard';
import ShareModal from '../components/ui/ShareModal';

export default function LeaderboardPage() {
    const [filter, setFilter] = useState('All');
    const [leaderboardData, setLeaderboardData] = useState<IHallOfShame[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeShareEntry, setActiveShareEntry] = useState<IHallOfShame | null>(null);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareImageBlob, setShareImageBlob] = useState<Blob | null>(null);
    const shareCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/hall-of-shame');
            const data = await res.json();
            if (data.success) {
                setLeaderboardData(data.data);
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async (entry: IHallOfShame) => {
        setActiveShareEntry(entry);

        // Wait for render
        setTimeout(async () => {
            if (!shareCardRef.current) return;

            try {
                const canvas = await html2canvas(shareCardRef.current, {
                    scale: 1, // 1080x1920 is already high res
                    backgroundColor: '#050508',
                    useCORS: true, // For external images if any
                });

                canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    setShareImageBlob(blob);
                    setShareModalOpen(true);
                    setActiveShareEntry(null); // Cleanup card render, keep modal open
                }, 'image/png');
            } catch (error) {
                console.error('Error generating image:', error);
                setActiveShareEntry(null);
            }
        }, 100);
    };

    const filteredData = filter === 'All'
        ? leaderboardData
        : leaderboardData.filter(item => item.game.name === filter);

    const uniqueGames = ['All', ...Array.from(new Set(leaderboardData.map(item => item.game.name)))];

    return (
        <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-[#ff00ff] selection:text-white">

            {/* Hidden Share Card Container */}
            <div className="fixed left-[-9999px] top-0">
                {activeShareEntry && (
                    <ShareCard ref={shareCardRef} entry={activeShareEntry} />
                )}
            </div>

            <ShareModal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                imageBlob={shareImageBlob}
            />

            {/* Navbar Placeholder */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff00ff] to-[#00d4ff] p-0.5 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-lg bg-black flex items-center justify-center">
                            <span className="text-white font-black">MT</span>
                        </div>
                    </div>
                    <span className="font-bold tracking-wider group-hover:text-[#00d4ff] transition-colors">GAMEHUB</span>
                </Link>
                <Link href="/" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all">
                    Back to Home
                </Link>
            </nav>

            <div className="container mx-auto px-4 pt-32 pb-20">

                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[#ff00ff]/5 blur-[100px] rounded-full -z-10" />
                    <h1 className="text-5xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-white to-[#00d4ff] animate-pulse">
                        HALL OF SHAME
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The digital graveyard of defeats. Where winners gloat and losers are immortalized forever.
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#ff00ff]/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#ff00ff]/20 flex items-center justify-center text-2xl mb-4">
                            😈
                        </div>
                        <h3 className="text-2xl font-bold mb-2">What is this?</h3>
                        <p className="text-gray-400">
                            A permanent record of your most epic victories. Did you destroy your friend 5-0 in FC 24?
                            Put it on the board so they never forget.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#00d4ff]/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-2xl mb-4">
                            📝
                        </div>
                        <h3 className="text-2xl font-bold mb-2">How to Join?</h3>
                        <p className="text-gray-400">
                            Just <span className="text-white font-bold">Rs. 100</span> per entry.
                            Ask the counter staff to add your match result.
                            Includes permanent bragging rights.
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {uniqueGames.map(game => (
                        <button
                            key={game}
                            onClick={() => setFilter(game)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === game
                                ? 'bg-[#00d4ff] text-black scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {game}
                        </button>
                    ))}
                </div>

                {/* Leaderboard List */}
                <div className="grid gap-4 max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center text-gray-500 py-10">Loading shame...</div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No entries found. Be the first to shame someone!</div>
                    ) : (
                        filteredData.map((item, index) => (
                            <div
                                key={String(item._id)}
                                onClick={() => handleShare(item)}
                                className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden hover:border-[#ff00ff]/50 transition-all hover:transform hover:scale-[1.01] cursor-pointer"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/10 via-transparent to-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

                                    {/* Game & Date */}
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold text-gray-500 group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <span className="text-[#00d4ff] text-xs font-bold uppercase tracking-widest block mb-1">
                                                {item.game.name}
                                            </span>
                                            <span className="text-gray-500 text-xs">
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Matchup */}
                                    <div className="flex-1 flex items-center justify-center gap-4 md:gap-8">
                                        <div className="text-right">
                                            <p className="text-xl md:text-2xl font-black text-white group-hover:text-[#ff00ff] transition-colors">
                                                {item.winner.name}
                                            </p>
                                            <p className="text-xs text-green-400 uppercase tracking-wider font-bold">Winner</p>
                                        </div>

                                        <div className="text-2xl font-black text-gray-700 italic">VS</div>

                                        <div className="text-left">
                                            <p className="text-xl md:text-2xl font-bold text-gray-400 line-through decoration-red-500/50 decoration-2">
                                                {item.loser.name}
                                            </p>
                                            <p className="text-xs text-red-500 uppercase tracking-wider font-bold">Loser</p>
                                        </div>
                                    </div>

                                    {/* Score & Quote */}
                                    <div className="text-center md:text-right w-full md:w-auto">
                                        <p className="text-3xl font-black text-white italic mb-1">
                                            {item.result.type === 'Score'
                                                ? `${item.result.scoreWinner} - ${item.result.scoreLoser}`
                                                : item.result.type}
                                        </p>
                                        {item.roast && (
                                            <p className="text-xs text-gray-500 italic">"{item.roast}"</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer CTA */}
                <div className="text-center mt-20">
                    <p className="text-gray-500 mb-4">Want to immortalize your victory?</p>
                    <button className="px-8 py-4 bg-gradient-to-r from-[#ff00ff] to-[#00d4ff] rounded-xl font-bold text-white uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                        Visit Counter • Rs. 100
                    </button>
                </div>

            </div>
        </div>
    );
}
