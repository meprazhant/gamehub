import React, { forwardRef } from 'react';
import { IHallOfShame } from '@/models/HallOfShame';

interface ShareCardProps {
    entry: IHallOfShame;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ entry }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: '1080px',
                height: '1920px',
                position: 'relative',
                overflow: 'hidden',
                padding: '96px 80px',
                backgroundColor: '#050508',
                fontFamily: 'sans-serif',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            {/* BACKGROUND GLOWS */}
            <div
                style={{
                    position: 'absolute',
                    top: '-300px',
                    left: '-300px',
                    width: '700px',
                    height: '700px',
                    background: 'rgba(255, 0, 255, 0.25)',
                    filter: 'blur(300px)'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-300px',
                    right: '-300px',
                    width: '700px',
                    height: '700px',
                    background: 'rgba(0, 212, 255, 0.25)',
                    filter: 'blur(300px)'
                }}
            />

            {/* TOP BRAND */}
            <div style={{ zIndex: 10, textAlign: 'center' }}>
                <p
                    style={{
                        fontSize: '36px',
                        letterSpacing: '0.4em',
                        fontWeight: 900,
                        color: '#00ffe0'
                    }}
                >
                    MT GAMEHUB
                </p>
            </div>

            {/* TITLE */}
            <div style={{ zIndex: 10, textAlign: 'center' }}>
                <h1
                    style={{
                        fontSize: '110px',
                        fontWeight: 900,
                        letterSpacing: '0.2em',
                        color: '#22d3ee',
                        textShadow: '0 0 40px rgba(34,211,238,0.6)',
                        marginBottom: '24px'
                    }}
                >
                    HALL OF SHAME
                </h1>
                <p
                    style={{
                        fontSize: '28px',
                        letterSpacing: '0.15em',
                        color: '#cbd5e1',
                        textTransform: 'uppercase'
                    }}
                >
                    Legends remember.{' '}
                    <span style={{ color: '#ff003c', fontWeight: 700 }}>
                        Losers
                    </span>{' '}
                    are immortalized.
                </p>
            </div>

            {/* MAIN CARD */}
            <div
                style={{
                    zIndex: 10,
                    width: '100%',
                    maxWidth: '900px',
                    padding: '80px',
                    borderRadius: '32px',
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(40px)',
                    border: '4px solid',
                    borderImage: 'linear-gradient(90deg, #00ffe0, #ff004c) 1',
                    boxShadow: '0 0 80px rgba(255,255,255,0.08)',
                    position: 'relative'
                }}
            >
                {/* GAME BADGE */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '48px',
                        padding: '16px 28px',
                        borderRadius: '999px',
                        background: '#00ff88',
                        color: '#000',
                        fontSize: '28px',
                        fontWeight: 900,
                        boxShadow: '0 0 20px rgba(0,255,136,0.6)'
                    }}
                >
                    {entry.game.name}
                </div>

                {/* PLAYERS */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '64px'
                    }}
                >
                    {/* WINNER */}
                    <div style={{ width: '45%' }}>
                        <p
                            style={{
                                fontSize: '22px',
                                letterSpacing: '0.2em',
                                color: '#22c55e',
                                marginBottom: '12px',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                            }}
                        >
                            Winner
                        </p>
                        <h2
                            style={{
                                fontSize: '56px',
                                fontWeight: 900,
                                color: '#4ade80'
                            }}
                        >
                            {entry.winner.name}
                        </h2>
                    </div>

                    <p
                        style={{
                            fontSize: '26px',
                            letterSpacing: '0.25em',
                            color: '#94a3b8',
                            textTransform: 'uppercase'
                        }}
                    >
                        DEF.
                    </p>

                    {/* LOSER */}
                    <div style={{ width: '45%', textAlign: 'right' }}>
                        <p
                            style={{
                                fontSize: '22px',
                                letterSpacing: '0.2em',
                                color: '#ff003c',
                                marginBottom: '12px',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                            }}
                        >
                            Loser
                        </p>
                        <h2
                            style={{
                                fontSize: '56px',
                                fontWeight: 900,
                                color: '#ff003c',
                                textDecoration: 'line-through'
                            }}
                        >
                            {entry.loser.name}
                        </h2>
                    </div>
                </div>

                {/* SCORE */}
                <div style={{ textAlign: 'center', marginTop: '96px' }}>
                    <p
                        style={{
                            fontSize: '96px',
                            fontWeight: 900,
                            color: '#ff003c',
                            textShadow: '0 0 30px rgba(255,0,60,0.6)'
                        }}
                    >
                        {entry.result.type === 'Score'
                            ? `${entry.result.scoreWinner} - ${entry.result.scoreLoser}`
                            : entry.result.type}
                    </p>

                    {entry.roast && (
                        <p
                            style={{
                                marginTop: '24px',
                                fontSize: '28px',
                                color: '#cbd5e1',
                                fontStyle: 'italic'
                            }}
                        >
                            “{entry.roast}”
                        </p>
                    )}
                </div>
            </div>

            {/* DATE */}
            <p
                style={{
                    zIndex: 10,
                    fontSize: '20px',
                    letterSpacing: '0.2em',
                    color: '#94a3b8'
                }}
            >
                {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>

            {/* FOOTER */}
            <div style={{ zIndex: 10, textAlign: 'center' }}>
                <p
                    style={{
                        fontSize: '22px',
                        color: '#00d4ff',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}
                >
                    Sagarmatha Chowk, Bhadrapur Jhapa
                </p>
                <p
                    style={{
                        fontSize: '22px',
                        marginTop: '8px',
                        color: '#cbd5e1'
                    }}
                >
                    📞 9701096430
                </p>
            </div>
        </div>
    );
});

ShareCard.displayName = 'ShareCard';
export default ShareCard;
