import Link from 'next/link';

type CTAKey = 'international-shipping' | 'taking-plants-home';

type Props = {
  lang: string;
  ctaLinks?: string[] | null;
};

const ctaContent = {
    jp: {
        'international-shipping': {
            title: '海外発送をご希望の方へ',
            description:
                'Cece Farmでは、タイから海外への植物発送に対応しています。国際配送の流れ・必要書類・料金についてご確認ください。',
            linkText: '海外発送について詳しく見る →',
            href: '/jp/terms',
        },
        'taking-plants-home': {
            title: 'タイから植物を持ち帰る方へ',
            description:
                '植物をタイから国外へ持ち出す場合は、植物検疫証明書などの手続きが必要になります。Cece Farmでは必要書類の取得もお手伝いしています。',
            linkText: '植物検疫・持ち帰り方法を見る →',
            href: '/jp/service/phyto_cites',
        },
    },
    en: {
        'international-shipping': {
            title: 'International Shipping',
            description:
                'Cece Farm can arrange international shipping of plants from Thailand. Please check our information about ordering, shipping, required documents and costs.',
            linkText: 'View international shipping information →',
            href: '/en/terms',
        },
        'taking-plants-home': {
            title: 'Taking Plants Home from Thailand',
            description:
                'Taking plants out of Thailand may require a phytosanitary certificate and other documents. Cece Farm can assist with the necessary export documentation.',
            linkText: 'Learn about taking plants home →',
            href: '/en/service/phyto_cites',
        },
    },
    th: {
        'international-shipping': {
            title: 'การจัดส่งต้นไม้ไปต่างประเทศ',
            description:
                'Cece Farm ให้บริการจัดส่งต้นไม้จากประเทศไทยไปต่างประเทศ กรุณาตรวจสอบข้อมูลเกี่ยวกับขั้นตอนการสั่งซื้อ การจัดส่ง เอกสารที่จำเป็น และค่าใช้จ่าย',
            linkText: 'ดูข้อมูลการจัดส่งระหว่างประเทศ →',
            href: '/en/terms',
        },
        'taking-plants-home': {
            title: 'การนำต้นไม้ออกจากประเทศไทย',
            description:
                'การนำต้นไม้ออกจากประเทศไทยอาจต้องใช้ใบรับรองสุขอนามัยพืชและเอกสารอื่น ๆ Cece Farm สามารถช่วยดำเนินการด้านเอกสารที่จำเป็นได้',
            linkText: 'ดูข้อมูลการนำต้นไม้ออกจากประเทศไทย →',
            href: '/th/service/phyto_cites',
        },
    },
};

export default function ServiceCTA({ lang, ctaLinks = [] }: Props) {
    const content = ctaContent[lang as keyof typeof ctaContent] || ctaContent.en;

    const selected = (ctaLinks ?? [])
        .filter((key): key is CTAKey =>
            key === 'international-shipping' || key === 'taking-plants-home'
        )
        .map((key) => content[key]);

    if (selected.length === 0) return null;

    return (
        <section style={{ margin: '70px 0 50px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                }}
            >
                {selected.map((cta) => (
                    <div
                        key={cta.href}
                        style={{
                            border: '1px solid #d9e0dc',
                            borderRadius: '14px',
                            padding: '28px',
                            backgroundColor: '#f7faf8',
                        }}
                    >
                        <h2
                            style={{
                                margin: '0 0 14px',
                                fontSize: '1.3rem',
                                lineHeight: 1.4,
                                color: '#2C3E35',
                            }}
                        >
                            {cta.title}
                        </h2>

                        <p
                            style={{
                                margin: '0 0 20px',
                                lineHeight: 1.8,
                                color: '#555',
                                fontSize: '0.95rem',
                            }}
                        >
                            {cta.description}
                        </p>

                        <Link
                            href={cta.href}
                            style={{
                                color: '#2d5a27',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            {cta.linkText}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}