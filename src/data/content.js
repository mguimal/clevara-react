export const LOGO_URL = 'https://i.ibb.co/m5HGs5DQ/695-F41-F0-0276-40-E3-B172-5-A419-B738-BE9-removebg-preview.png';

export const NAV_LINKS = [
    { id: 'inicio', key: 'nav.home' },
    { id: 'clebots', key: 'nav.clebots' },
    { id: 'strategy', key: 'nav.enterprise' },
    { id: 'beneficios', key: 'nav.benefits' },
    { id: 'nosotros', key: 'nav.about' },
    { id: 'faq', key: 'nav.faq' },
];

export const MOBILE_LINKS = [
    { id: 'inicio', key: 'nav.home', icon: 'fa-home' },
    { id: 'clebots', key: 'nav.clebots', icon: 'fa-robot' },
    { id: 'strategy', key: 'nav.enterprise', icon: 'fa-chart-line' },
    { id: 'beneficios', key: 'nav.benefits', icon: 'fa-chart-line' },
    { id: 'nosotros', key: 'nav.about', icon: 'fa-users' },
    { id: 'faq', key: 'nav.faq', icon: 'fa-question-circle' },
];

const listBlock = (headingKey, keys) => ({ headingKey, items: keys });

const benefitsBlock = (prefix) => ({
    benefits: [1, 2, 3, 4].map((n) => ({
        titleKey: `${prefix}.benefits.b${n}.title`,
        descKey: `${prefix}.benefits.b${n}.desc`,
    })),
});

export const PLANS = [
    {
        id: 'lite',
        colorVar: '--lite-color',
        columns: [
            [
                listBlock('clebots.lite.details.featuresTitle', [
                    'clebots.lite.details.feature1',
                    'clebots.lite.details.feature2',
                    'clebots.lite.details.feature3',
                    'clebots.lite.details.feature4',
                    'clebots.lite.details.feature5',
                ]),
                listBlock('clebots.lite.details.techTitle', [
                    'clebots.lite.details.tech1',
                    'clebots.lite.details.tech2',
                    'clebots.lite.details.tech3',
                    'clebots.lite.details.tech4',
                    'clebots.lite.details.tech5',
                ]),
            ],
            [benefitsBlock('clebots.lite')],
        ],
    },
    {
        id: 'advanced',
        colorVar: '--advanced-color',
        columns: [
            [
                listBlock('clebots.advanced.details.featuresTitle', [
                    'clebots.advanced.details.feature1',
                    'clebots.advanced.details.feature2',
                    'clebots.advanced.details.feature3',
                    'clebots.advanced.details.feature4',
                    'clebots.advanced.details.feature5',
                    'clebots.advanced.details.feature6',
                    'clebots.advanced.details.feature7',
                    'clebots.advanced.details.feature8',
                ]),
                listBlock('clebots.advanced.details.techTitle', [
                    'clebots.advanced.details.tech1',
                    'clebots.advanced.details.tech2',
                    'clebots.advanced.details.tech3',
                    'clebots.advanced.details.tech4',
                    'clebots.advanced.details.tech5',
                ]),
            ],
            [benefitsBlock('clebots.advanced')],
        ],
    },
    {
        id: 'automation',
        colorVar: '--automation-color',
        columns: [
            [
                listBlock('clebots.automation.details.featuresTitle', [
                    'clebots.automation.details.feature1',
                    'clebots.automation.details.feature2',
                    'clebots.automation.details.feature3',
                    'clebots.automation.details.feature4',
                    'clebots.automation.details.feature5',
                    'clebots.automation.details.feature6',
                    'clebots.automation.details.feature7',
                ]),
                listBlock('clebots.automation.details.dashboardTitle', [
                    'clebots.automation.details.dash1',
                    'clebots.automation.details.dash2',
                    'clebots.automation.details.dash3',
                    'clebots.automation.details.dash4',
                    'clebots.automation.details.dash5',
                    'clebots.automation.details.dash6',
                ]),
            ],
            [
                listBlock('clebots.automation.details.premiumTitle', [
                    'clebots.automation.details.premium1',
                    'clebots.automation.details.premium2',
                    'clebots.automation.details.premium3',
                    'clebots.automation.details.premium4',
                    'clebots.automation.details.premium5',
                ]),
                benefitsBlock('clebots.automation'),
            ],
        ],
    },
];

export const STARTER_BLOCKS = [
    { titleKey: 'clebots.starter.block1.title', subKey: 'clebots.starter.block1.sub' },
    { titleKey: 'clebots.starter.block2.title', subKey: 'clebots.starter.block2.sub' },
    { titleKey: 'clebots.starter.block3.title', subKey: 'clebots.starter.block3.sub' },
];

export const COMPARE_FEATURES = Array.from({ length: 12 }, (_, i) => `compare.feature${i + 1}`);

export const COMPARE_PLANS = [
    { prefix: 'compare.lite', cls: 'lite', checks: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { prefix: 'compare.advanced', cls: 'advanced', checks: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
    { prefix: 'compare.automation', cls: 'automation', checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
];

export const CALC_TIERS = [
    { id: 'lite', nameKey: 'calc.tier.lite.name', priceKey: 'calc.tier.lite.price', cls: 'tier-lite' },
    { id: 'advanced', nameKey: 'calc.tier.advanced.name', priceKey: 'calc.tier.advanced.price', cls: 'tier-advanced' },
    { id: 'automation', nameKey: 'calc.tier.automation.name', priceKey: 'calc.tier.automation.price', cls: 'tier-automation' },
];

export const BENEFIT_ROWS = [
    { icon: 'fa-clock', titleKey: 'benefits.list.b1.title', descKey: 'benefits.list.b1.desc', delay: 0.2 },
    { icon: 'fa-money-bill-wave', titleKey: 'benefits.list.b2.title', descKey: 'benefits.list.b2.desc', delay: 0.25 },
    { icon: 'fa-smile', titleKey: 'benefits.list.b3.title', descKey: 'benefits.list.b3.desc', delay: 0.3 },
    { icon: 'fa-chart-line', titleKey: 'benefits.list.b4.title', descKey: 'benefits.list.b4.desc', delay: 0.35 },
    { icon: 'fa-bullseye', titleKey: 'benefits.list.b5.title', descKey: 'benefits.list.b5.desc', delay: 0.4 },
    { icon: 'fa-shield-alt', titleKey: 'benefits.list.b6.title', descKey: 'benefits.list.b6.desc', delay: 0.45 },
];

export const VALUES = [
    { icon: 'fa-rocket', titleKey: 'about.values.v1.title', descKey: 'about.values.v1.desc', delay: 0.15 },
    { icon: 'fa-handshake', titleKey: 'about.values.v2.title', descKey: 'about.values.v2.desc', delay: 0.2 },
    { icon: 'fa-bolt', titleKey: 'about.values.v3.title', descKey: 'about.values.v3.desc', delay: 0.25 },
    { icon: 'fa-lightbulb', titleKey: 'about.values.v4.title', descKey: 'about.values.v4.desc', delay: 0.3 },
];

export const FAQS = [
    {
        q: 'faq.q1.question',
        a1: 'faq.q1.answer1',
        lis: ['faq.q1.li1', 'faq.q1.li2', 'faq.q1.li3'],
        a2: 'faq.q1.answer2',
        delay: 0,
    },
    {
        q: 'faq.q2.question',
        a1: 'faq.q2.answer1',
        lis: ['faq.q2.li1', 'faq.q2.li2', 'faq.q2.li3', 'faq.q2.li4', 'faq.q2.li5'],
        a2: 'faq.q2.answer2',
        delay: 0.05,
    },
    {
        q: 'faq.q3.question',
        a1: 'faq.q3.answer1',
        lis: ['faq.q3.li1', 'faq.q3.li2', 'faq.q3.li3', 'faq.q3.li4', 'faq.q3.li5'],
        a2: 'faq.q3.answer2',
        delay: 0.1,
    },
    {
        q: 'faq.q4.question',
        a1: 'faq.q4.answer1',
        lis: ['faq.q4.li1', 'faq.q4.li2', 'faq.q4.li3', 'faq.q4.li4', 'faq.q4.li5'],
        a2: 'faq.q4.answer2',
        delay: 0.15,
    },
    {
        q: 'faq.q5.question',
        a1: 'faq.q5.answer1',
        lis: ['faq.q5.li1', 'faq.q5.li2', 'faq.q5.li3', 'faq.q5.li4'],
        a2: 'faq.q5.answer2',
        delay: 0.2,
    },
];

export const FOOTER_QUICK_LINKS = [
    { id: 'inicio', key: 'footer.links1.home' },
    { id: 'clebots', key: 'footer.links1.clebots' },
    { id: 'strategy', key: 'footer.links1.enterprise' },
    { id: 'beneficios', key: 'footer.links1.benefits' },
    { id: 'nosotros', key: 'footer.links1.about' },
    { id: 'faq', key: 'footer.links1.faq' },
    { id: 'contacto', key: 'footer.links1.contact' },
];

export const FOOTER_LEGAL_LINKS = [
    { key: 'footer.links2.terms' },
    { key: 'footer.links2.privacy' },
    { key: 'footer.links2.cookies' },
];
