import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // アイコンライブラリを使用する場合（後でインストール可）

export default function ContactPage() {
    return (
        <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>

            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#2d5a27' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                {/* 左側：基本情報 */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>Information</h2>

                    <div style={infoItemStyle}>
                        <Clock size={20} style={{ color: '#2d5a27' }} />
                        <span>Open 9:30 AM – Close 8:00 PM</span>
                    </div>

                    <div style={infoItemStyle}>
                        <MapPin size={20} style={{ color: '#2d5a27' }} />
                        <span>Chiang Mai, Thailand 234 M.7 Keilek Maerim</span>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#666' }}>Connect with us</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                            {/* WhatsApp (欧米向け) */}
                            <div style={snsContainerStyle}>
                                <a href="https://wa.me/あなたの番号" style={buttonStyle('#25D366')}>WhatsApp</a>
                                <div style={qrWrapperStyle}>
                                    <img src="/qrs/whatsapp.png" alt="WhatsApp QR" style={qrImageStyle} />
                                    <span style={qrLabelStyle}>Scan to Chat</span>
                                </div>
                            </div>

                            {/* LINE (一般用) */}
                            <div style={snsContainerStyle}>
                                <a href="https://line.me/ti/p/一般ID" style={buttonStyle('#06C755')}>LINE (General)</a>
                                <div style={qrWrapperStyle}>
                                    <img src="/qrs/line_general.png" alt="LINE General QR" style={qrImageStyle} />
                                    <span style={qrLabelStyle}>Scan to Add</span>
                                </div>
                            </div>

                            {/* LINE (日本語専用) */}
                            <div style={snsContainerStyle}>
                                <a href="https://line.me/ti/p/日本語ID" style={buttonStyle('#06C755')}>LINE (Japanese Support)</a>
                                <div style={qrWrapperStyle}>
                                    <img src="/qrs/line_jp.png" alt="LINE JP QR" style={qrImageStyle} />
                                    <span style={qrLabelStyle}>日本語専用</span>
                                </div>
                            </div>

                        </div>

                        {/* 右側：Google Map 埋め込み */}
                        <div style={{ height: '100%', minHeight: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#2d5a27' }}>Message Us</h2>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Name</label>
                                        <input type="text" placeholder="Your Name" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Email</label>
                                        <input type="email" placeholder="Your Email address" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Message</label>
                                        <textarea placeholder="How can we help you?" rows={5} style={inputStyle}></textarea>
                                    </div>
                                    <button
                                        type="button"
                                        style={{
                                            backgroundColor: '#2d5a27',
                                            color: '#fff',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                )
}

                const infoItemStyle = {
                    display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
                fontSize: '1rem'
};
                const labelStyle = {
                    display: 'block',
                fontSize: '0.8rem',
                color: '#666',
                marginBottom: '8px',
                fontWeight: 'bold' as const
};
                const inputStyle = {
                    width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box' as const,
                fontFamily: 'inherit'
};
const buttonStyle = (bgColor: string, textColor: string = '#fff') => ({
                    display: 'block',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center' as const,
                textDecoration: 'none',
                backgroundColor: bgColor,
                color: textColor,
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'opacity 0.2s'
});
                const snsContainerStyle = {
                    display: 'flex',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                borderRadius: '12px',
};

                const qrWrapperStyle = {
                    textAlign: 'center' as const,
                flexShrink: 0,
};

                const qrImageStyle = {
                    width: '60px',
                height: '60px',
                display: 'block',
                marginBottom: '4px',
};

                const qrLabelStyle = {
                    fontSize: '0.6rem',
                color: '#999',
};