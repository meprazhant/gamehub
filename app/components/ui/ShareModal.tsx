import React from 'react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageBlob: Blob | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, imageBlob }) => {
    if (!isOpen || !imageBlob) return null;

    const imageUrl = URL.createObjectURL(imageBlob);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                const file = new File([imageBlob!], 'hall-of-shame.png', { type: 'image/png' });

                // Check if file sharing is supported
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'MT Gamehub Hall of Shame',
                        text: 'Check out this match result!',
                        files: [file],
                    });
                } else {
                    // Fallback: share text + URL
                    await navigator.share({
                        title: 'MT Gamehub Hall of Shame',
                        text: 'Check out this match result!',
                        url: imageUrl, // URL created via createObjectURL
                    });
                }
            } catch (err) {
                console.error('Error sharing:', err);
                alert('Failed to share. Please try again.');
            }
        } else {
            alert('Sharing is not supported on this device/browser.');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'hall-of-shame.png';
        link.click();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': imageBlob
                })
            ]);
            alert('Image copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy image:', err);
            alert('Failed to copy image.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0a0a0f] border border-white/10 max-h-[90vh] rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h3 className="text-xl font-bold text-white mb-6 text-center">Share Victory</h3>

                <div className="mb-6 rounded-xl max-h-[50vh] flex items-center justify-center w-full overflow-hidden border border-white/10 bg-black/50 aspect-[9/16] relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Share Preview" className="w-full h-full  object-contain" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={handleShare}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#00d4ff]/50 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </div>
                        <span className="text-xs font-medium text-gray-300">Share</span>
                    </button>

                    <button
                        onClick={handleCopy}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#ff00ff]/50 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#ff00ff]/20 flex items-center justify-center text-[#ff00ff] group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </div>
                        <span className="text-xs font-medium text-gray-300">Copy</span>
                    </button>

                    <button
                        onClick={handleDownload}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-green-500/50 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </div>
                        <span className="text-xs font-medium text-gray-300">Save</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ShareModal;
