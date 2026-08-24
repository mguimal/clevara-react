import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { CALC_TIERS } from '../data/content';
import { calcularAhorroCleBot, fmt } from '../lib/calc';

let activeCount = 0;
function lockScroll() {
    if (activeCount++ === 0) document.body.style.overflow = 'hidden';
}
function releaseScroll() {
    if (--activeCount <= 0) {
        activeCount = 0;
        document.body.style.overflow = '';
    }
}

function setSliderFromX(input, clientX, onChange) {
    const rect = input.getBoundingClientRect();
    const min = parseFloat(input.min), max = parseFloat(input.max), step = parseFloat(input.step) || 1;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    let raw = min + ratio * (max - min);
    raw = Math.round(raw / step) * step;
    raw = Math.max(min, Math.min(max, raw));
    if (parseFloat(input.value) !== raw) {
        onChange(raw);
    }
}

function SliderRow({ labelKey, min, max, step, value, onChange, display }) {
    const inputRef = useRef(null);
    const touchRef = useRef(null);
    const valueRef = useRef(onChange);
    valueRef.current = onChange;

    useEffect(() => {
        const input = inputRef.current;
        const touch = touchRef.current;
        let dragging = false;

        function start(e) {
            dragging = true;
            lockScroll();
            e.preventDefault();
            const x = (e.touches ? e.touches[0] : e).clientX;
            setSliderFromX(input, x, valueRef.current);
        }
        function move(e) {
            if (!dragging) return;
            e.preventDefault();
            const x = (e.touches ? e.touches[0] : e).clientX;
            setSliderFromX(input, x, valueRef.current);
        }
        function end() {
            if (!dragging) return;
            dragging = false;
            releaseScroll();
        }
        function onMouseDown(e) {
            dragging = true;
            lockScroll();
            setSliderFromX(input, e.clientX, valueRef.current);
            e.preventDefault();
        }
        function docMove(e) {
            if (dragging) setSliderFromX(input, e.clientX, valueRef.current);
        }
        function docUp() {
            if (dragging) {
                dragging = false;
                releaseScroll();
            }
        }

        touch.addEventListener('touchstart', start, { passive: false });
        touch.addEventListener('touchmove', move, { passive: false });
        touch.addEventListener('touchend', end);
        touch.addEventListener('touchcancel', end);
        touch.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', docMove);
        document.addEventListener('mouseup', docUp);

        return () => {
            touch.removeEventListener('touchstart', start);
            touch.removeEventListener('touchmove', move);
            touch.removeEventListener('touchend', end);
            touch.removeEventListener('touchcancel', end);
            document.removeEventListener('mousemove', docMove);
            document.removeEventListener('mouseup', docUp);
        };
    }, []);

    return (
        <div className="slider-row">
            <span className="slider-label"><T k={labelKey} /></span>
            <div className="slider-input-wrap">
                <input
                    ref={inputRef}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(+e.target.value)}
                />
                <div className="slider-touch" ref={touchRef}></div>
            </div>
            <span className="slider-val">{display}</span>
        </div>
    );
}

export default function RoiCalculator() {
    const [tierId, setTierId] = useState('advanced');
    const [citas, setCitas] = useState(500);
    const [horas, setHoras] = useState(3);
    const [ausencias, setAusencias] = useState(18);
    const [precioCita, setPrecioCita] = useState(60);

    const result = useMemo(
        () =>
            calcularAhorroCleBot({
                citasMes: citas,
                precioCita,
                tasaAusenciasPct: ausencias,
                horasDiaLlamadas: horas,
                tierId,
            }),
        [citas, precioCita, ausencias, horas, tierId]
    );

    const net = result.ahorroNeto12Meses;
    const netNegative = net < 0;

    let paybackNum = '—';
    let paybackUnit = '';
    if (result.mesesParaRecuperar !== null && result.mesesParaRecuperar >= 0) {
        if (result.mesesParaRecuperar < 1) {
            const semanas = result.mesesParaRecuperar * 4.33;
            if (semanas < 1) {
                paybackNum = 'menos de 1';
                paybackUnit = 'semana';
            } else {
                const s = Math.ceil(semanas);
                paybackNum = String(s);
                paybackUnit = s === 1 ? 'semana' : 'semanas';
            }
        } else {
            const m = Math.round(result.mesesParaRecuperar);
            paybackNum = String(m);
            paybackUnit = m === 1 ? 'mes' : 'meses';
        }
    }

    const ausAntes = result.ausencias.antes;
    const ausDespues = result.ausencias.despues;
    const maxAus = Math.max(ausAntes, 1);
    const hAntes = result.tiempoAdministrativo.antesHorasMes;
    const hDespues = result.tiempoAdministrativo.despuesHorasMes;
    const maxH = Math.max(hAntes, 1);

    return (
        <Reveal variant="fade-in" delay={0.2} className="roi-calculator">
            <h3 className="card-title"><T k="calc.title" /></h3>
            <p className="card-subtitle"><T k="calc.subtitle" /></p>

            <p className="section-label"><T k="calc.tierLabel" /></p>
            <div className="tier-selector" id="tierSelector">
                {CALC_TIERS.map((tier) => (
                    <div
                        key={tier.id}
                        className={`tier-option ${tier.cls}${tierId === tier.id ? ' selected' : ''}`}
                        data-tier={tier.id}
                        onClick={() => setTierId(tier.id)}
                    >
                        <div className="tier-check"><i className="fas fa-check"></i></div>
                        <div className="tier-name"><T k={tier.nameKey} /></div>
                        <div className="tier-price"><T k={tier.priceKey} /></div>
                    </div>
                ))}
            </div>

            <p className="section-label"><T k="calc.paramsLabel" /></p>
            <SliderRow
                labelKey="calc.slider1"
                min={50}
                max={2000}
                step={10}
                value={citas}
                onChange={setCitas}
                display={fmt(citas)}
            />
            <SliderRow
                labelKey="calc.slider2"
                min={0.5}
                max={8}
                step={0.5}
                value={horas}
                onChange={setHoras}
                display={`${horas.toFixed(horas % 1 ? 1 : 0)} h`}
            />
            <SliderRow
                labelKey="calc.slider3"
                min={3}
                max={40}
                step={1}
                value={ausencias}
                onChange={setAusencias}
                display={`${Math.round(ausencias)} %`}
            />
            <SliderRow
                labelKey="calc.slider4"
                min={20}
                max={200}
                step={1}
                value={precioCita}
                onChange={setPrecioCita}
                display={`${precioCita} €`}
            />

            <hr className="divider" />

            <p className="section-label"><T k="calc.resultLabel" /></p>
            <div className="metrics">
                <div className="metric">
                    <p className="metric-label"><T k="calc.metric1.label" /></p>
                    <p className="metric-value">{fmt(result.horasLiberadasMes)} h</p>
                    <p className="metric-sub"><T k="calc.metric1.sub" /></p>
                </div>
                <div className="metric">
                    <p className="metric-label"><T k="calc.metric2.label" /></p>
                    <p className="metric-value">{fmt(result.citasRecuperadasMes)}</p>
                    <p className="metric-sub"><T k="calc.metric2.sub" /></p>
                </div>
                <div className="metric">
                    <p className="metric-label"><T k="calc.metric3.label" /></p>
                    <p className="metric-value accent">{fmt(result.ingresosAdicionalesAnuales)} €</p>
                    <p className="metric-sub" style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                        {fmt(result.ingresosAdicionalesAnuales / 12)} €/mes
                    </p>
                    <p className="metric-sub"><T k="calc.metric3.sub" /></p>
                </div>
            </div>

            <div className="chart-section">
                <div className="legend">
                    <span>
                        <span className="leg-dot" style={{ background: '#94a3b8' }}></span>
                        <span><T k="calc.legend.before" /></span>
                    </span>
                    <span>
                        <span className="leg-dot" style={{ background: 'var(--primary-color)' }}></span>
                        <span><T k="calc.legend.after" /></span>
                    </span>
                </div>
                <div className="bar-group">
                    <div className="bar-item">
                        <span className="bar-name"><T k="calc.bar.ausencias" /></span>
                        <div className="bar-track">
                            <div className="bar-fill before" style={{ width: '100%' }}></div>
                        </div>
                        <span className="bar-num">{fmt(ausAntes)}</span>
                    </div>
                    <div className="bar-item">
                        <span className="bar-name"></span>
                        <div className="bar-track">
                            <div
                                className="bar-fill after"
                                style={{ width: `${Math.round((ausDespues / maxAus) * 100)}%` }}
                            ></div>
                        </div>
                        <span className="bar-num">{fmt(ausDespues)}</span>
                    </div>
                    <div className="bar-item" style={{ marginTop: '6px' }}>
                        <span className="bar-name"><T k="calc.bar.tiempo" /></span>
                        <div className="bar-track">
                            <div className="bar-fill before" style={{ width: '100%' }}></div>
                        </div>
                        <span className="bar-num">{fmt(hAntes)} h</span>
                    </div>
                    <div className="bar-item">
                        <span className="bar-name"></span>
                        <div className="bar-track">
                            <div
                                className="bar-fill after"
                                style={{ width: `${Math.round((hDespues / maxH) * 100)}%` }}
                            ></div>
                        </div>
                        <span className="bar-num">{fmt(hDespues)} h</span>
                    </div>
                </div>
            </div>

            <div
                className="net-savings-highlight"
                style={{
                    background: netNegative
                        ? 'linear-gradient(135deg,#ef4444 0%,#dc2626 100%)'
                        : 'linear-gradient(135deg,#10b981 0%,#059669 100%)',
                }}
            >
                <div className="ns-label">
                    <span><T k="calc.netLabel" /></span><br />
                    <span style={{ opacity: 0.85, fontSize: '0.75rem' }}><T k="calc.netSub" /></span>
                </div>
                <div className="ns-value">
                    <span>{netNegative ? `−${fmt(Math.abs(net))}` : fmt(net)}</span> €
                    <small><T k="calc.netUnit" /></small>
                </div>
            </div>

            <div className="payback-banner">
                <span className="payback-text"><T k="calc.paybackText" /></span>
                <span>
                    <span className="payback-months">{paybackNum}</span>
                    <span className="payback-unit">{paybackUnit}</span>
                </span>
            </div>
        </Reveal>
    );
}
