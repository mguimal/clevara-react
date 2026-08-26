import { useEffect, useRef, useState } from 'react';
import { T } from '../i18n/I18nContext';

const DURATION = 27.5;
const THINK_START = 10.2;
const CAL_START = 16.2;
const OUTRO_AT = 21.0;

const THINK_KEYS = ['demo.think1', 'demo.think2', 'demo.think3', 'demo.think4', 'demo.think5'];
const THINK_ICONS = ['fa-calendar-days', 'fa-clock', 'fa-user-clock', 'fa-user-doctor', 'fa-paper-plane'];

export default function DemoVideo() {
    const [t, setT] = useState(0);

    useEffect(() => {
        if (document.documentElement.classList.contains('low-power')) {
            setT(18.4);
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

    const chatScene = t < THINK_START;
    const thinkScene = t >= THINK_START && t < CAL_START;
    const calScene = t >= CAL_START;
    const outro = t >= OUTRO_AT;

    const showP1 = t >= 0.35;
    const showTyping1 = t >= 1.7 && t < 3.1;
    const showBot = t >= 3.1;
    const showTyping2 = t >= 4.9 && t < 6.3;
    const showP2 = t >= 6.3;
    const showTyping3 = t >= 7.6 && t < 8.6;
    const showBot2 = t >= 8.6;
    const showTicks = t >= 7.2;

    let thinkIdx = Math.floor((t - THINK_START) / 1.2);
    thinkIdx = Math.max(0, Math.min(THINK_KEYS.length - 1, thinkIdx));

    return (
        <div className="demo-stage">
            <div className="demo-window">
                <div className="demo-chrome">
                    <span className="dc-dot dc-red"></span>
                    <span className="dc-dot dc-yellow"></span>
                    <span className="dc-dot dc-green"></span>
                    <span className="dc-title">CleBot™ — Live demo</span>
                    <span className="dc-live"><i></i> DEMO</span>
                </div>

                <div className="demo-body">
                    {/* ESCENA 1: CHAT */}
                    <div className={`dscene scene-chat${chatScene ? ' is-active' : ''}`}>
                        <div className="demo-chat">
                            <div className="dc-head">
                                <span className="dc-avatar"><i className="fas fa-robot"></i></span>
                                <div>
                                    <strong>CleBot™</strong>
                                    <small>en línea</small>
                                </div>
                            </div>

                            <div className="dc-msgs">
                                {showP1 && (
                                    <div className="dmsg dmsg--user"><T k="demo.msg.p1" /></div>
                                )}
                                {showBot && (
                                    <div className="dmsg dmsg--bot"><T k="demo.msg.bot" /></div>
                                )}
                                {showP2 && (
                                    <div className="dmsg dmsg--user">
                                        <T k="demo.msg.p2" />
                                        {showTicks && (
                                            <span className="dmsg-ticks"><i className="fas fa-check-double"></i></span>
                                        )}
                                    </div>
                                )}
                                {showBot2 && (
                                    <div className="dmsg dmsg--bot"><T k="demo.msg.bot2" /></div>
                                )}
                                {(showTyping1 || showTyping2 || showTyping3) && (
                                    <div className="dmsg dmsg--bot dmsg--typing">
                                        <span></span><span></span><span></span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="demo-right">
                            <div className="dr-watermark">
                                <i className="fas fa-tooth"></i>
                                <span>Clevara Studios™</span>
                            </div>
                        </div>
                    </div>

                    {/* ESCENA 2: PENSANDO */}
                    <div className={`dscene scene-think${thinkScene ? ' is-active' : ''}`}>
                        <div className="dt-card">
                            <div className="dt-spinner">
                                <span className="dt-ring"></span>
                                <i className="fas fa-circle-notch"></i>
                            </div>
                            <div className="dt-label">CleBot™ está trabajando</div>
                            <div className="dt-steps">
                                {THINK_KEYS.map((key, i) => (
                                    <p
                                        key={key}
                                        className={thinkIdx === i ? 'on' : thinkIdx > i ? 'done' : ''}
                                    >
                                        <i className={`fas ${thinkIdx > i ? 'fa-check' : THINK_ICONS[i]}`}></i>
                                        <T k={key} />
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ESCENA 3: CALENDARIO */}
                    <div className={`dscene scene-cal${calScene ? ' is-active' : ''}`}>
                        <div className="dr-calendar is-active">
                            <div className="cal-head">
                                <strong>Agenda de la clínica</strong>
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
                                                    <span><T k="demo.patient" /> · V 12:30–13:15</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`cal-confirm${t >= 17.8 ? ' is-in' : ''}`}>
                                <span className="cc-check"><i className="fas fa-check"></i></span>
                                <div>
                                    <strong><T k="demo.confirmed" /></strong>
                                    {t >= 19.0 && (
                                        <small>
                                            <i className="fab fa-whatsapp"></i>{' '}
                                            <T k="demo.reminder" /> — WhatsApp · 11:30
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OUTRO */}
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
