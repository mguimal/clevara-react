import { useEffect, useRef, useState } from 'react';
import { T } from '../i18n/I18nContext';

const DURATION = 25.5;
const TYPING_1 = [1.7, 3.1];
const TYPING_2 = [4.7, 6.1];
const THINK_START = 8.6;
const CAL_START = 13.4;
const CONFIRM_AT = 14.9;
const REMINDER_AT = 16.3;
const OUTRO_AT = 18.8;

export default function DemoVideo() {
    const [t, setT] = useState(0);
    const frozenRef = useRef(false);

    useEffect(() => {
        if (document.documentElement.classList.contains('low-power')) {
            frozenRef.current = true;
            setT(17.2);
            return undefined;
        }
        let start = performance.now();
        let raf = 0;
        let last = 0;
        const loop = (now) => {
            raf = requestAnimationFrame(loop);
            if (now - last < 120) return;
            last = now;
            setT(((now - start) / 1000) % DURATION);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    const inChat = t < THINK_START;
    const thinking = t >= THINK_START && t < CAL_START;
    const calendar = t >= CAL_START;
    const outro = t >= OUTRO_AT;

    const showP1 = t >= 0.35;
    const showTyping1 = t >= TYPING_1[0] && t < TYPING_1[1];
    const showBot = t >= TYPING_1[1];
    const showTyping2 = t >= TYPING_2[0] && t < TYPING_2[1];
    const showP2 = t >= TYPING_2[1];

    const thinkIdx = t < 10.15 ? 0 : t < 11.75 ? 1 : 2;

    return (
        <div className="demo-stage">
            <div className={`demo-window${outro ? ' is-outro' : ''}`}>
                <div className="demo-chrome">
                    <span className="dc-dot dc-red"></span>
                    <span className="dc-dot dc-yellow"></span>
                    <span className="dc-dot dc-green"></span>
                    <span className="dc-title">CleBot™ — Live demo</span>
                    <span className="dc-live"><i></i> DEMO</span>
                </div>

                <div className="demo-body">
                    {/* Panel de chat (izquierda) */}
                    <div className="demo-chat">
                        <div className="dc-head">
                            <span className="dc-avatar"><i className="fas fa-robot"></i></span>
                            <div>
                                <strong>CleBot™</strong>
                                <small>{inChat || thinking ? 'en línea' : 'en línea'}</small>
                            </div>
                        </div>

                        <div className="dc-msgs">
                            {showP1 && (
                                <div className="dmsg dmsg--user" style={{ animationDelay: '0s' }}>
                                    <T k="demo.msg.p1" />
                                </div>
                            )}
                            {showBot && (
                                <div className="dmsg dmsg--bot">
                                    <T k="demo.msg.bot" />
                                </div>
                            )}
                            {showP2 && (
                                <div className="dmsg dmsg--user">
                                    <T k="demo.msg.p2" />
                                    {t > 7.6 && (
                                        <span className="dmsg-ticks">
                                            <i className="fas fa-check-double"></i>
                                        </span>
                                    )}
                                </div>
                            )}
                            {(showTyping1 || showTyping2) && (
                                <div className="dmsg dmsg--bot dmsg--typing">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel derecho: marca de agua / pensando / calendario */}
                    <div className="demo-right">
                        {!calendar && (
                            <div className={`dr-watermark${thinking ? ' is-dim' : ''}`}>
                                <i className="fas fa-tooth"></i>
                                <span>Clevara Studios™</span>
                            </div>
                        )}

                        <div className={`dr-thinking${thinking ? ' is-active' : ''}`}>
                            <div className="dt-card">
                                <div className="dt-spinner">
                                    <i className="fas fa-circle-notch"></i>
                                </div>
                                <div className="dt-steps">
                                    <p className={thinkIdx === 0 ? 'on' : thinkIdx > 0 ? 'done' : ''}>
                                        <i className={`fas ${thinkIdx > 0 ? 'fa-check' : 'fa-calendar-days'}`}></i>
                                        <T k="demo.think1" />
                                    </p>
                                    <p className={thinkIdx === 1 ? 'on' : thinkIdx > 1 ? 'done' : ''}>
                                        <i className={`fas ${thinkIdx > 1 ? 'fa-check' : 'fa-clock'}`}></i>
                                        <T k="demo.think2" />
                                    </p>
                                    <p className={thinkIdx === 2 ? 'on' : ''}>
                                        <i className="fas fa-user-doctor"></i>
                                        <T k="demo.think3" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`dr-calendar${calendar ? ' is-active' : ''}`}>
                            <div className="cal-head">
                                <strong>Agenda</strong>
                                <span className="cal-week">Semana · 12–18</span>
                            </div>
                            <div className="cal-grid">
                                <div className="cal-times">
                                    <span>09:00</span><span>10:00</span><span>11:00</span>
                                    <span>12:00</span><span>13:00</span><span>14:00</span>
                                </div>
                                <div className="cal-days">
                                    {['L', 'M', 'X', 'J', 'V', 'S'].map((d, i) => (
                                        <div className={`cal-col${i === 4 ? ' cal-col--fri' : ''}`} key={d}>
                                            <span className="cal-dayname">{d}</span>
                                            {Array.from({ length: 6 }).map((_, r) => (
                                                <div className="cal-slot" key={r}></div>
                                            ))}
                                            {i === 4 && (
                                                <div className="cal-event">
                                                    <strong><T k="demo.event" /></strong>
                                                    <span><T k="demo.patient" /> · 12:30</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`cal-confirm${t >= CONFIRM_AT ? ' is-in' : ''}`}>
                                <span className="cc-check"><i className="fas fa-check"></i></span>
                                <div>
                                    <strong><T k="demo.confirmed" /></strong>
                                    {t >= REMINDER_AT && (
                                        <small><i className="fas fa-bell"></i> <T k="demo.reminder" /></small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Outro */}
                    <div className={`demo-outro${outro ? ' is-active' : ''}`}>
                        <span className="do-chip">
                            <i className="fas fa-wand-magic-sparkles"></i>
                            <T k="demo.outro" />
                        </span>
                    </div>
                </div>

                <div className="demo-progress">
                    <span style={{ width: `${(t / DURATION) * 100}%` }}></span>
                </div>
            </div>
        </div>
    );
}
