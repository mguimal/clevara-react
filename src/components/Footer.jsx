import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <Reveal className="footer-about">
                    <div className="footer-logo">Clevara Studios™</div>
                    <p><T k="footer.about" /></p>
                </Reveal>
                <Reveal className="footer-links" delay={0.05}>
                    <h3><T k="footer.links1.title" /></h3>
                    <ul>
                        {FOOTER_QUICK_LINKS.map((link) => (
                            <li key={link.id}>
                                <a href={`#${link.id}`} onClick={(e) => handleAnchorClick(e, `#${link.id}`)}>
                                    <T k={link.key} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal className="footer-links" delay={0.1}>
                    <h3><T k="footer.links2.title" /></h3>
                    <ul>
                        {FOOTER_LEGAL_LINKS.map((link) => (
                            <li key={link.key}>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <T k={link.key} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal className="footer-links" delay={0.15}>
                    <h3><T k="footer.links3.title" /></h3>
                    <ul>
                        <li>Email: clevarastudios@gmail.com</li>
                        <li>Teléfono: +34 696 707 913</li>
                    </ul>
                </Reveal>
            </div>
            <Reveal className="footer-bottom" delay={0.2}>
                <p>© 2025 Clevara Studios™. All rights reserved.</p>
            </Reveal>
        </footer>
    );
}
