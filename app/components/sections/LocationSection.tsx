'use client';

import GlassPanel from '../ui/GlassPanel';

interface LocationSectionProps {
    visible: boolean;
}

export default function LocationSection({ visible }: LocationSectionProps) {
    return (
        <section className="section">
            <div
                className={`section-content text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="heading-lg text-gradient mb-4">
                    Visit Us
                </h2>

                <p className="text-body max-w-xl mx-auto mb-12">
                    Find us at the heart of Sagarmatha Chowk, Jhapa.
                    Your gaming adventure awaits!
                </p>

                <GlassPanel className="max-w-lg mx-auto" glowColor="pink">
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#ff00ff]/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">📍</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white mb-1">Address</h3>
                                <p className="text-gray-400">
                                    Sagarmatha Chowk, Jhapa<br />
                                    Nepal
                                </p>
                            </div>
                        </div>

                        <div className="hud-line" />

                        {/* Hours */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">🕐</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white mb-1">Hours</h3>
                                <p className="text-gray-400">
                                    Open Daily<br />
                                    10:00 AM - 10:00 PM
                                </p>
                            </div>
                        </div>

                        <div className="hud-line" />

                        {/* Contact */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">📱</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white mb-1">Contact</h3>
                                <p className="text-gray-400">
                                    Call us to book your slot
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className="btn-neon w-full mt-8">
                        Get Directions
                    </button>
                </GlassPanel>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} MT Gamehub. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6 mt-4">
                        <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                            Facebook
                        </span>
                        <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                            Instagram
                        </span>
                        <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                            TikTok
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
