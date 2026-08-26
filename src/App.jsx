import { useEffect, useState } from 'react';
import { I18nProvider } from './i18n/I18nContext';
import { initSmoothScroll } from './lib/smoothScroll';
import { initLowPowerDetection } from './lib/lowPower';

import Preloader from './components/Preloader';
import LangToggle from './components/LangToggle';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import StatsBand from './components/StatsBand';
import ClebotsSection from './components/ClebotsSection';
import StrategySection from './components/StrategySection';
import IntegrationsSection from './components/IntegrationsSection';
import BenefitsSection from './components/BenefitsSection';
import AboutSection from './components/AboutSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCta from './components/FloatingCta';
import GradualBlur from './components/GradualBlur';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => initLowPowerDetection(), []);
    useEffect(() => initSmoothScroll(), []);

    const toggleCard = (id) => setExpandedCard((cur) => (cur === id ? null : id));

    return (
        <I18nProvider>
            <LangToggle />
            <Navbar onToggleMenu={() => setMenuOpen((o) => !o)} />
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

            <Hero />

            <StatsBand />

            <ClebotsSection expandedCard={expandedCard} onToggleCard={toggleCard} />
            <StrategySection expandedCard={expandedCard} onToggleCard={toggleCard} />
            <BenefitsSection />
            <AboutSection />
            <FaqSection />
            <ContactSection />
            <Footer />
            <FloatingCta />

            <GradualBlur
                target="page"
                position="bottom"
                height="4.5rem"
                strength={2}
                divCount={6}
                curve="bezier"
                exponential={true}
                opacity={1}
                zIndex={1000}
            />
        </I18nProvider>
    );
}
