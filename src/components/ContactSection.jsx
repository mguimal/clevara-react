import { useEffect, useRef, useState } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import Reveal from './Reveal';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwpaekpk';

export default function ContactSection() {
    const { t } = useI18n();
    const hideTimer = useRef(null);
    const [status, setStatus] = useState('idle');
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => () => clearTimeout(hideTimer.current), []);

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('loading');
        try {
            const fd = new FormData(form);
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: fd,
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                setPopupOpen(true);
                form.reset();
                setStatus('success');
            } else {
                throw new Error('Error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            hideTimer.current = setTimeout(() => setStatus('idle'), 5000);
        }
    }

    return (
        <section id="contacto" className="contact">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="contact.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="contact.subtitle" /></Reveal>
            </div>
            <Reveal
                as="form"
                variant="scale-in"
                className="contact-form"
                id="contactForm"
                onSubmit={onSubmit}
            >
                <input type="hidden" name="_next" value="https://tusitio.com/gracias.html" />
                <input type="hidden" name="_subject" value="Nueva solicitud de CleBot™ Gratis" />
                <input type="hidden" name="_language" value="es" />
                {status !== 'idle' && (
                    <div className={`form-message ${status === 'loading' ? 'loading' : status === 'success' ? 'success' : 'error'}`} id="formMessage">
                        {status === 'loading' && 'Enviando...'}
                        {status === 'success' && '¡Formulario enviado con éxito!'}
                        {status === 'error' && 'Error al enviar. Intenta nuevamente.'}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="name"><T k="contact.form.name" /></label>
                    <input type="text" id="name" name="name" className="form-control" placeholder={t("contact.form.name.placeholder")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email"><T k="contact.form.email" /></label>
                    <input type="email" id="email" name="email" className="form-control" placeholder={t("contact.form.email.placeholder")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone"><T k="contact.form.phone" /></label>
                    <input type="tel" id="phone" name="phone" className="form-control" placeholder={t("contact.form.phone.placeholder")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="clinic"><T k="contact.form.clinic" /></label>
                    <input type="text" id="clinic" name="clinic" className="form-control" placeholder={t("contact.form.clinic.placeholder")} />
                </div>
                <div className="form-group">
                    <label htmlFor="message"><T k="contact.form.message" /></label>
                    <textarea id="message" name="message" className="form-control" rows="4" placeholder={t("contact.form.message.placeholder")}></textarea>
                </div>
                <input type="text" name="_gotcha" style={{ display: 'none' }} />
                <button type="submit" className="submit-btn" id="submitBtn" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                        <>
                            <span>Enviando...</span>
                            <span className="loading-spinner" style={{ display: 'inline-block' }}></span>
                        </>
                    ) : (
                        <T as="span" k="contact.form.submit" />
                    )}
                </button>
            </Reveal>

            <div
                className={`popup-overlay${popupOpen ? ' active' : ''}`}
                id="confirmationPopup"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setPopupOpen(false);
                }}
            >
                <div className="popup-content">
                    <div className="popup-icon"><i className="fas fa-check-circle"></i></div>
                    <h3><T k="popup.title" /></h3>
                    <p><T k="popup.text" /></p>
                    <button className="popup-close" id="closePopup" onClick={() => setPopupOpen(false)}>
                        <T k="popup.button" />
                    </button>
                </div>
            </div>
        </section>
    );
}
