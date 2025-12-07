'use client';

import GlassPanel from '../ui/GlassPanel';

interface HeroSectionProps {
    visible: boolean;
}

export default function HeroSection({ visible }: HeroSectionProps) {
    return (
        <section className="section">
            <div
                className={`section-content text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                {/* Main heading - positioned higher to work with 3D logo */}
                <div className="mt-32 sm:mt-40">
                    <h1 className="heading-xl text-gradient mb-4">
                        MT GAMEHUB
                    </h1>

                    <p className="heading-md text-white/80 mb-8">
                        Play. Compete. Repeat.
                    </p>

                    <GlassPanel className="inline-block max-w-md mx-auto relative">
                        <p className="text-body">
                            Experience gaming like never before at Sagarmatha Chowk&apos;s premier console gaming station.
                        </p>
                    </GlassPanel>

                    {/* Scroll hint */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 rounded-full bg-[#ff00ff] animate-bounce" />
                        </div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">
                            Scroll to explore
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
