import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
            
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#2d5a27' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                
                {/* 左側：直接連絡 & SNS */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#2d5a27' }}>Information</h2>
                    
                    <div style={infoItemStyle}>
                        <Clock size={20} style={{ color: '#2d5a27' }} />
                        <span>Open 9:00 AM – 5:00 PM</span>
                    </div>

                    <div style={infoItemStyle}>
                        <MapPin size={20} style={{ color: '#2d5a27' }} />
                        <span>THAILAND Chiang Mai 50180 Keilek Maerim 234 M.7</span>
                    </div>

                    <div style={infoItemStyle}>
                        <Mail size={20} style={{ color: '#2d5a27' }} />
                        <span>contact@cecefarm.com</span>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '20px', color: '#666' }}>Chat with us (WhatsApp / LINE)</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* WhatsApp */}
                            <div style={snsRowStyle}>
                                <a href="https://wa.me/66932287477" style={buttonStyle('#25D366')}>WhatsApp</a>
                                <img src="/qrs/whatsapp.png" alt="WhatsApp QR" style={smallQrStyle} />
                            </div>

                            {/* LINE General */}
                            <div style={snsRowStyle}>
                                <a href="https://line.me/ti/p/3126panadda" style={buttonStyle('#06C755')}>LINE (English/Thai)</a>
                                <img src="/qrs/line_general.png" alt="LINE General QR" style={smallQrStyle} />
                            </div>

                            {/* LINE JP */}
                            <div style={snsRowStyle}>
                                <a href="https://line.me/ti/p/@314zcwog" style={buttonStyle('#06C755')}>LINE (日本語専用)</a>
                                <img src="/qrs/line_jp.png" alt="LINE Japanese QR" style={smallQrStyle} />
                            </div>

                            {/* Phone for Thai customers */}
                            <a href="tel:093-226-1788" style={buttonStyle('#555')}>Call Us (Thailand)</a>
                        </div>
                    </div>
                </div>

                {/* 右側：メールフォーム */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#2d5a27' }}>Message Us</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>Name</label>
                            <input type="text" placeholder="Your Name" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Email</label>
                            <input type="email" placeholder="contact@cecefarm.com" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Message</label>
                            <textarea placeholder="How can we help you?" rows={5} style={inputStyle}></textarea>
                        </div>
                        <button type="button" style={submitButtonStyle}>Send Message</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

// スタイル定義（一箇所にまとめることで、エラーを防ぎます）
const infoItemStyle = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '0.95rem' };
const snsRowStyle = { display: 'flex', alignItems: 'center', gap: '15px' };
const smallQrStyle = { width: '50px', height: '50px', borderRadius: '4px', border: '1px solid #eee' };
const labelStyle = { display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '8px', fontWeight: 'bold' as const };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' as const, fontFamily: 'inherit' };
const submitButtonStyle = { backgroundColor: '#2d5a27', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold' as const, cursor: 'pointer', fontSize: '1rem' };
const buttonStyle = (bgColor: string) => ({ flex: 1, padding: '12px', borderRadius: '8px', textAlign: 'center' as const, textDecoration: 'none', backgroundColor: bgColor, color: '#fff', fontWeight: 'bold' as const, fontSize: '0.85rem' });

export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}