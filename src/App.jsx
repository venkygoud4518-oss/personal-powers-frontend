
import React, { useState, useRef, useEffect } from 'react';
import { motion,  } from 'framer-motion';

// --- NAKED LEADER LOGO & BRANDING ---
const NakedLeaderLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}>
  <a href="https://www.nakedleader.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <img 
      src="/nakedleader.jpeg" alt="Naked Leader Logo" style={{ height: '52px', objectFit: 'contain' }} 
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<span style="font-size:1.8rem; font-weight:900; background:linear-gradient(90deg, #ec4899, #38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">NAKED LEADER</span>';
      }}
    />
  </a>
  <span style={{ fontsize: '1rem' , fontWeight: 'bold', color: '#94a3b8', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingleft : '12px'}}>
    University of East London
    </span>
  </div>
);

// --- 7 CORE POWER STATS (TRUMP CARD SLOTS) ---
const SEVEN_SLOTS = [
  { level: 12, title: "⚡ UNSTOPPABLE", tag: "SUPER POWER", color: "#ec4899", desc: "Who you are at your absolute peak." },
  { level: 10, title: "💎 TRADEMARK", tag: "SIGNATURE POWER", color: "#38bdf8", desc: "What people naturally recognize you for." },
  { level: 8, title: "🔥 CORE ASSET", tag: "GREATEST POWER", color: "#a855f7", desc: "A key asset you regularly use & share." },
  { level: 6, title: "🚀 NEXT LEVEL", tag: "FUTURE POWER", color: "#22c55e", desc: "The capability you're excited to grow." },
  { level: 4, title: "🛡️ BACKUP", tag: "SUPPORTING POWER", color: "#f59e0b", desc: "Capable and happy to do when needed." },
  { level: 2, title: "🔋 DRAINING", tag: "RESERVE POWER", color: "#64748b", desc: "Takes more energy than it gives back." },
  { level: 0, title: "⚠️ DANGER", tag: "KRYPTONITE", color: "#ef4444", desc: "Drains you completely. Delegate it!" }
];

const POWERS_DATA = {
  "Relationships": ["Listening", "Empathy", "Kindness", "Encouraging others", "Forgiveness", "Patience"],
  "Thinking": ["Creativity", "Curiosity", "Problem solving", "Learning quickly", "Seeing patterns"],
  "Communication": ["Speaking", "Storytelling", "Teaching", "Writing", "Influencing", "Networking"],
  "Character": ["Courage", "Integrity", "Resilience", "Humility", "Optimism", "Reliability"],
  "Achievement": ["Getting things done", "Focus", "Self-discipline", "Organisation", "Adaptability", "Initiative"],
  "Human": ["Compassion", "Gratitude", "Positivity", "Humour", "Calmness", "Energy"]
};

// ==========================================
// 1. AUTHENTICATION & PROFILE PAGE
// ==========================================
function AuthPage({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email.trim()) { alert("Please enter your email."); return; }
    setShowForgotMsg(true);
    setTimeout(() => setShowForgotMsg(false), 4000);
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const finalName = name.trim() || email.split('@')[0];

      const endpoint =
      authMode === 'signup'
    ? 'https://personal-powers-backend.onrender.com/api/auth/register'
    : 'https://personal-powers-backend.onrender.com/api/auth/login';

      const body =
        authMode === 'signup'
          ? {
              name: finalName,
              email,
              password
            }
          : {
              email,
              password
            };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      onAuthSuccess({
      id: data.user.id,
      name: data.user.name,
     email: data.user.email,
     photo
    });

    } catch (error) {
      console.error('Authentication error:', error);
      alert('Could not connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 20%, #1e1b4b 0%, #0f172a 50%, #030712 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        maxWidth: '980px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '28px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden'
      }}>

        {/* LEFT SIDE */}
        <div style={{
          padding: '40px 32px',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(56, 189, 248, 0.05))',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <NakedLeaderLogo />

            <br />

            <h1 style={{
              fontSize: '2.1rem',
              fontWeight: '800',
              color: '#f8fafc',
              marginTop: '28px',
              lineHeight: '1.2'
            }}>
              Discover What is
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #ec4899, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                RIGHT With You
              </span>
            </h1>

            <p style={{
              color: '#94a3b8',
              fontSize: '0.9rem',
              marginTop: '12px',
              lineHeight: '1.6'
            }}>
              Create your profile, unlock your Personal Powers card,
              and fulfill the promise of your first few seconds.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            marginTop: '20px'
          }}>
            <span style={{
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              ⚡ Interactive Card Profiler
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          {/* SIGN UP / SIGN IN */}
          <div style={{
            background: '#0f172a',
            padding: '4px',
            borderRadius: '12px',
            display: 'flex',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'signup'
                  ? '#ec4899'
                  : 'transparent',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'signin'
                  ? '#0284c7'
                  : 'transparent',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Sign In
            </button>
          </div>

          {/* PROFILE PHOTO */}
          {authMode === 'signup' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(30, 41, 59, 0.9)',
                  border: photo
                    ? '3px solid #38bdf8'
                    : '2px dashed #ec4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      fontSize: '1.5rem',
                      display: 'block'
                    }}>
                      📸
                    </span>

                    <span style={{
                      fontSize: '0.6rem',
                      color: '#ec4899',
                      fontWeight: 'bold'
                    }}>
                      ADD PHOTO
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#cbd5e1',
                  padding: '3px 10px',
                  borderRadius: '16px',
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                {photo ? 'Change Photo' : 'Upload Card Photo'}
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >

            {/* NAME */}
            {authMode === 'signup' && (
              <div>
                <label style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>
                  FULL NAME
                </label>

                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label style={{
                display: 'block',
                color: '#cbd5e1',
                fontSize: '0.75rem',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px'
              }}>
                <label style={{
                  color: '#cbd5e1',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  PASSWORD
                </label>

                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* FORGOT PASSWORD MESSAGE */}
            {showForgotMsg && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38bdf8',
                padding: '8px',
                borderRadius: '6px',
                color: '#38bdf8',
                fontSize: '0.75rem',
                textAlign: 'center'
              }}>
                📧 Reset link sent to your email!
              </div>
            )}

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '8px',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'signup'
                  ? 'linear-gradient(90deg, #ec4899, #38bdf8)'
                  : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              {isLoading
                ? 'Loading...'
                : authMode === 'signup'
                  ? 'Create My Card Profile →'
                  : 'Sign In →'}
            </motion.button>

          </form>
        </div>
      </div>
    </div>
  );
}



// ==========================================
// 2. INTRO EXPERIENCE SCREEN (POST-LOGIN)
// ==========================================
function IntroScreen({ user, onContinue, onBackToIntro }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 20%, #1e1b4b 0%, #0f172a 60%, #030712 100%)',
      color: '#f8fafc',
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent : 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
    {/* ⬅️ BACK TO LOGIN BUTTON */}
<button
  onClick={onBackToIntro} 
  style={{
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#FF6600';
    e.currentTarget.style.borderColor = '#FF6600';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  }}
>
  ← Back to Login
</button>

      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(100px)', pointerEvents: 'none'
      }} />

      <main style={{ maxWidth: '920px', width: '100%', zIndex: 10, textAlign: 'center', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)',
            padding: '8px 20px', borderRadius: '30px', marginBottom: '20px'
          }}>
            {user?.photo && (
              <img src={user.photo} alt={user.name} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
            )}
            <span style={{ color: '#f472b6', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Welcome, {user?.name || 'Leader'} • The Mindset Shift
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: '900', lineHeight: '1.15', margin: '0 0 10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {/* NAKED LEADER LOGO */}
            <img 
              src="/nakedleader.jpeg"            
              alt="Naked Leader Logo" 
              style={{ 
                height: '110px', 
                Width: 'auto',
                objectFit: 'contain', 
                display: 'block'
              }} 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
          />
            
            <span style={{
              background: 'linear-gradient(90deg, #ec4899, #38bdf8, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textShadow: '0 0 35px rgba(236, 72, 153, 0.35)'
            }}>
              Personal Powers
            </span>
                  <div style={{ 
    fontSize: '1rem', 
    fontWeight: '600', 
    color: '#94a3b8', 
    marginTop: '6px',
    letterSpacing: '0.5px',
    textShadow: 'none'
  }}>
    (A Gift For Every Human Being )
  </div>
</h1>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '20px', padding: '20px 28px', margin: '24px 0 32px 0', backdropFilter: 'blur(15px)'
          }}
        >
          <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: '#e2e8f0', fontWeight: '600', lineHeight: '1.6', margin: 0 }}>
            "The revolution is in its simplicity – <span style={{ color: '#ef4444', fontWeight: '800' }}>no to pigeonholing</span> and <span style={{ color: '#38bdf8', fontWeight: '800' }}>yes to one scientific fact</span> acknowledged by Scientists:"
          </p>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#38bdf8', fontWeight: '900', marginTop: '8px', letterSpacing: '-0.5px' }}>
            ⚡ "Everything you need is already within within you."
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}
        >
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '24px', padding: '28px', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '14px' }}>
              OLD PARADIGM
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', margin: '0 0 10px 0', fontWeight: '800' }}>The DSM Manual</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
              Lists what may be <strong style={{ color: '#fca5a5' }}>‘wrong’</strong> with people. From 106 disorders in 1952 to over <strong style={{ color: '#ef4444' }}>1000+</strong> today. Psychologists discredit it because it completely ignores strengths that balance weaknesses.
            </p>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>DSM FOCUS</span>
              <span style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '1px' }}>FAILURE</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(56, 189, 248, 0.08))', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '28px', backdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '14px' }}>
              NEW DISCOVERY
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', margin: '0 0 10px 0', fontWeight: '800' }}> Naked Leader Personal Powers</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
              Focuses on what is <strong style={{ color: '#38bdf8' }}>‘right’</strong> with us. Unlocks the hidden strengths, passions, and genius you possess, may not be aware of, or are yet to discover.
            </p>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 'bold' }}>NAKED LEADER</span>
              <span style={{ color: '#38bdf8', fontWeight: '900', letterSpacing: '1px' }}>ADVENTURE</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ margin: '32px 0 28px 0', padding: '24px', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '20px', border: '1px solid rgba(236, 72, 153, 0.25)' }}
        >
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px 0', fontWeight: '700' }}>
            We are replacing "What's Wrong" with...
          </p>
          <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: '900', color: '#fff', fontStyle: 'italic', letterSpacing: '-0.5px', textShadow: '0 0 25px rgba(56, 189, 248, 0.5)' }}>
            “This is who I really am.”
          </div>
          <div style={{
  background: 'rgba(56, 189, 248, 0.08)',
  border: '1px solid rgba(56, 189, 248, 0.3)',
  borderRadius: '16px',
  padding: '16px 20px',
  margin: '0 auto 24px auto',
  maxWidth: '680px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 25px rgba(56, 189, 248, 0.15)'
}}>
  <p style={{
    fontSize: '0.88rem',
    color: '#38bdf8',
    lineHeight: '1.6',
    fontWeight: '600',
    margin: 0,
    fontStyle: 'normal',
    textAlign: 'center'
  }}>
    {`“Together, we have created a common language for human potential strengths, passions, and genius that people already have. We did this to help everyone on earth fulfil the promise of their first few seconds, to ensure no regrets in their last”`}
  </p>
</div>


        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)' }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          style={{
            padding: '18px 44px', borderRadius: '50px', border: 'none',
            background: 'linear-gradient(90deg, #ec4899, #38bdf8)', color: '#fff',
            fontSize: '1.15rem', fontWeight: '900', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.35)', transition: 'all 0.3s'
          }}
        >
          Unlock My Personal Powers →
        </motion.button>

      </main>
    </div>
  );
}
// ==========================================
// 3. MAIN APP & TRUMP CARD BUILDER (WITH AI INSIGHTS & SUMMARY)
// ==========================================
function PowersBuilder({ user, mode, onBackToIntro }) {
  const isProf = mode === 'professional';
  const [backendPowers, setBackendPowers] = useState([]);
  const loadSavedSelections = async () => {
  try {
   const response = await fetch(
  `https://personal-powers-backend.onrender.com/api/selections/${user.id}`
);

    const data = await response.json();

    if (!response.ok) {
      console.log("No saved selections found.");
      return;
    }

    setAssignedPowers(data.selections);

    console.log("Saved Personal Powers loaded:", data.selections);

  } catch (error) {
    console.error("Error loading saved selections:", error);
  }
};
  const powersToDisplay =
  backendPowers && Object.keys(backendPowers).length > 0
    ? backendPowers
    : POWERS_DATA;

useEffect(() => {
  const url = isProf
  ? 'https://personal-powers-backend.onrender.com/api/powers/professional'
  : 'https://personal-powers-backend.onrender.com/api/powers/personal/categories';
  fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log("BACKEND POWERS:", data);
    setBackendPowers(data);
    console.log("PERSONAL CATEGORIES FROM BACKEND:", data);
    loadSavedSelections();
  })
    .catch(error => {
      console.error('Error loading powers:', error);
    });
}, [isProf, user.id]);
  const [assignedPowers, setAssignedPowers] = useState({});
  const [activeSlot, setActiveSlot] = useState(12);
  const [showDeckView, setShowDeckView] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleSelectPower = (power) => {
    const existingSlot = Object.keys(assignedPowers).find(slot => assignedPowers[slot] === power);
    setAssignedPowers(prev => {
      const next = { ...prev };
      if (existingSlot) delete next[existingSlot];
      next[activeSlot] = power;
      return next;
    });
  
    // const handleAddCustomPower =(e) => {
      // e.preventDefault();
      // if (!newPowerInput.trim()) return;

      // const formattedPower = newPowerInput.trim();
      // if (!customPowers.includes(formattedPower)) {
        // setCustomPowers([...customPowers, formattedPower]);
      // }
      // setNewPowerInput('');
    // };

    const slots = [12, 10, 8, 6, 4, 2, 0];
    const currentIndex = slots.indexOf(activeSlot);
    if (currentIndex < slots.length - 1) {
      setActiveSlot(slots[currentIndex + 1]);
    }
  };

  const assignedCount = Object.keys(assignedPowers).length;
  const currentSlotObj = SEVEN_SLOTS.find(s => s.level === activeSlot);

  const [customPowers, setCustomPowers] = useState([]);
  const [newPowerInput, setNewPowerInput] =useState('');

  const saveSelections = async (selections) => {
  try {
    console.log("CURRENT USER:", user);
    const response = await fetch('https://personal-powers-backend.onrender.com/api/selections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user?.id,
        selections
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
      return;
    }

    console.log('Selections saved:', data.message);

  } catch (error) {
    console.error('Error saving selections:', error);
  }
};

  // AI INSIGHT GENERATOR BASED ON SELECTIONS
const getAIInsights = () => {
  const superPower = assignedPowers[12];
  const signaturePower = assignedPowers[10];
  const kryptonite = assignedPowers[0];

return {
  coreStrength: `Your driving core is powered by **${superPower}** combined with **${signaturePower}**. This gives you an exceptional ability to lead initiatives with vision and natural authority.`,
    
    developmentArea: `Watch out for **${kryptonite}** as your Kryptonite (Level 0). Delegating or setting boundaries around tasks requiring high ${kryptonite} will prevent energy burnout.`,
    
    growthTip: `To unlock your maximum potential, leverage your top powers (${superPower}) while actively mentoring others in areas where you excel!`
  };
};


const aiInsights = getAIInsights();

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f8fafc', padding: '24px 16px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <NakedLeaderLogo />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={onBackToIntro} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 'bold', backdropFilter: 'blur(10px)' }}>← Switch Mode</button>
            <a href="https://www.nakedleader.com" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>www.nakedleader.com ↗️</a>
          </div>
        </div>

        {!showDeckView ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ background: isProf ? 'rgba(56,189,248,0.15)' : 'rgba(236,72,153,0.15)', color: isProf ? '#38bdf8' : '#ec4899', border: `1px solid ${isProf ? '#38bdf840' : '#ec489940'}`, padding: '6px 20px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                {isProf ? 'PROFESSIONAL POWERS™️' : 'PERSONAL POWERS'}
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', margin: '14px 0 6px 0', background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Build Your Powers Card
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select a target slot on your card, then pick your power below!</p>
            </div>

            {/* CARD */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ 
                  width: '100%', 
                  maxWidth: '380px', 
                  background: 'linear-gradient(165deg, #0f172a 0%, #1e1b4b 100%)', 
                  border: `2px solid ${currentSlotObj?.color || '#ec4899'}`, 
                  borderRadius: '28px', 
                  padding: '20px', 
                  boxShadow: `0 0 35px ${currentSlotObj?.color || '#ec4899'}35`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '14px' }}>
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name} style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #38bdf8', objectFit: 'cover', boxShadow: '0 0 10px rgba(56,189,248,0.5)' }} />
                  ) : (
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>👤</div>
                  )}
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.72rem', color: isProf ? '#38bdf8' : '#ec4899', fontWeight: '800' }}>
                      {isProf ? 'Professional Powers™️' : 'Personal Powers'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {SEVEN_SLOTS.map(s => {
                    const isSelected = activeSlot === s.level;
                    const powerVal = assignedPowers[s.level];

                    return (
                      <motion.div 
                        key={s.level} 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSlot(s.level)} 
                        style={{ 
                          display: 'flex', 
                          justify: 'space-between', 
                          alignItems: 'center', 
                          padding: '10px 14px', 
                          borderRadius: '12px', 
                          cursor: 'pointer', 
                          background: isSelected ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)', 
                          border: isSelected ? `2px solid ${s.color}` : '1px solid rgba(255,255,255,0.06)',
                          boxShadow: isSelected ? `0 0 15px ${s.color}50` : 'none',
                          transition: 'all 0.2s ease',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <div style={{flex :1, minWidth:0}}></div>
                          <div style={{ fontSize: '0.65rem', color: s.color, fontWeight: '900', letterSpacing: '0.5px' }}>{s.tag} • {s.title}</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: powerVal ? '#fff' : '#64748b', marginTop: '2px' }}>
                            {powerVal || 'Tap to assign...'}
                          </div>
                        </div>
                        <div style={{ background: s.color, color: '#fff', fontWeight: '900', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', boxShadow: `0 0 10px ${s.color}80`, marginLeft: 'auto', flexShrink : 0 }}>
                          {s.level}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* POWERS */}
            {Object.entries(powersToDisplay).map(([cat, powers]) => (
              <div key={cat} style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#38bdf8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '14px', fontWeight: '800' }}>{cat}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
                  {powers.map(power => {
                    const assignedSlot = Object.keys(assignedPowers).find(slot => assignedPowers[slot] === power);
                    const slotObj = assignedSlot !== undefined ? SEVEN_SLOTS.find(s => s.level === parseInt(assignedSlot)) : null;

                    return (
                      <motion.button 
                        key={power} 
                        whileHover={{ scale: 1.05, y: -2 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={() => handleSelectPower(power)} 
                        style={{ 
                          background: slotObj ? slotObj.color : 'rgba(15, 23, 42, 0.7)', 
                          border: slotObj ? `2px solid ${slotObj.color}` : '1px solid rgba(255,255,255,0.1)', 
                          color: '#fff', 
                          padding: '12px 14px', 
                          borderRadius: '14px', 
                          cursor: 'pointer', 
                          textAlign: 'left', 
                          display: 'flex', 
                          justify: 'space-between', 
                          alignItems: 'center',
                          boxShadow: slotObj ? `0 4px 15px ${slotObj.color}40` : '0 2px 8px rgba(0,0,0,0.3)',
                          backdropFilter: 'blur(5px)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{power}</span>
                        {slotObj && (
                          <span style={{ background: '#000', color: slotObj.color, padding: '2px 6px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '900' }}>
                            {slotObj.level}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 3. Custom Power Input Box */}
<div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 102, 0, 0.08)', borderRadius: '12px', border: '1px dashed #FF6600' }}>
  <h4 style={{ margin: '0 0 10px 0', color: '#FF6600', fontSize: '1rem' }}>
    ➕ Add your own power that's not on the list
  </h4>
  <form onSubmit={(e) => { 
    e.preventDefault();
    if (!newPowerInput.trim()) return;
    const formattedPower = newPowerInput.trim();
    if(!customPowers.includes(formattedPower)) {
      setCustomPowers([...customPowers, formattedPower]);
    }
    setNewPowerInput('');
  }}
    style={{ display: 'flex', gap: '8px' }}>
    <input
      type="text"
      placeholder="Type custom power..."
      value={newPowerInput}
      onChange={(e) => setNewPowerInput(e.target.value)}
      style={{
        flex: 1,
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        outline: 'none'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '10px 18px',
        borderRadius: '8px',
        background: '#FF6600',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Add
    </button>
  </form>

  
  {customPowers.length > 0 && (
    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {customPowers.map(power => {
        const isSelected = Object.values(assignedPowers).includes(power);
        return (
          <button
            key={power}
            onClick={() => handleSelectPower(power)}
            className={isSelected ? 'power-selected' : ''}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: isSelected ? '#FF6600' : 'rgba(15, 23, 42, 0.7)',
              color: '#fff',
              border: '1px solid #FF6600',
              cursor: 'pointer'
            }}
          >
            ⚡ {power}
          </button>
        );
      })}
    </div>
  )}
</div>

            <div style={{ textAlign: 'center', marginTop: '36px', paddingBottom: '40px' }}>
              <motion.button 
                whileHover={assignedCount === 7 ? { scale: 1.05 } : {}}
                whileTap={assignedCount === 7 ? { scale: 0.95 } : {}}
                onClick={async () => {
                await saveSelections(assignedPowers);
                setShowDeckView(true);
                }}
                disabled={assignedCount < 7} 
                style={{ 
                  padding: '18px 48px', 
                  borderRadius: '40px', 
                  border: 'none', 
                  background: assignedCount === 7 ? 'linear-gradient(90deg, #ec4899, #38bdf8)' : '#1e293b', 
                  color: assignedCount === 7 ? '#fff' : '#64748b', 
                  fontSize: '1.05rem', 
                  fontWeight: '900', 
                  cursor: assignedCount === 7 ? 'pointer' : 'not-allowed',
                  boxShadow: assignedCount === 7 ? '0 0 30px rgba(236,72,153,0.4)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {assignedCount === 7 ? 'Unleash My Personal Powers  🃏' : `Assign All 7 Stats (${assignedCount}/7)`}
              </motion.button>
            </div>
          </>
        ) : (
          /* FINAL CARD SHEET VIEW WITH POWERS & POTENTIAL SUMMARY + AI INSIGHTS */
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              id="printableCard" 
              style={{ background: 'linear-gradient(145deg, #0f172a, #1e1b4b)', border: '3px solid #38bdf8', borderRadius: '28px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)', color: '#fff', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <NakedLeaderLogo />
                <span style={{ background: isProf ? '#0284c7' : '#ec4899', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  {isProf ? 'PROFESSIONAL POWERS™️' : 'PERSONAL POWERS'}
                </span>
              </div>

              {/* 🌟 SPIDER-MAN STYLE CENTERED CARD DECK */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '20px',
          padding: '20px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          marginTop: '10px'
        }}>
          {/* 1. BIGGER CENTER PROFILE PHOTO */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '4px solid #ec4899',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
            marginBottom: '12px',
            background: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {user?.photo ? (
              <img src={user.photo} alt={user?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ fontSize: '4rem', color: '#94a3b8' }}>👤</div>
            )}
          </div>

          {/* USER NAME & TITLE */}
          <h3 style={{ margin: 0, fontSize: '1.7rem', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' }}>
            {user?.name || ''}
          </h3>
          <p style={{ margin: '4px 0 20px 0', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600' }}>
            Naked Leader Card Deck
          </p>

          {/* 2. POWERS & RATINGS LIST (Kinda Powers Style) */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SEVEN_SLOTS.map(s => (
              <div key={s.level} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                borderLeft: `5px solid ${s.color}`,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '12px 16px'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: s.color, fontWeight: '900', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    ⚡ {s.tag || s.title}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>
                    {assignedPowers[s.level] || 'Unassigned'}
                  </div>
                </div>

                <div style={{
                  background: s.color,
                  color: '#fff',
                  fontWeight: '900',
                  padding: '5px 14px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  boxShadow: `0 0 12px ${s.color}80`
                }}>
                  {s.level}
                </div>
              </div>
            ))}
          </div>
        </div>
              {/* 🌟 1. POWERS & POTENTIAL SUMMARY */}
              <div style={{
              marginTop: '10px',
              background: 'rgba(255,255,255,0.03)',
             border: '1px solid rgba(255,255,255,0.1)',
             borderRadius: '16px',
            padding: '10px'
            }}
            >
                <h4 style={{ margin: '0 0 10px 0', color: '#ec4899', fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  📊 Powers & Potential Summary
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                  Based on your selections, here is your breakdown across top strengths and key focus areas:
                </p>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>🚀 <strong style={{ color: '#fff' }}>Absolute Peak (12):</strong> {assignedPowers[12]}</div>
                  <div>💎 <strong style={{ color: '#fff' }}>Natural Recognition (10):</strong> {assignedPowers[10]}</div>
                  <div>🔥 <strong style={{ color: '#fff' }}>Core Asset (8):</strong> {assignedPowers[8]}</div>
                  <div>🌱 <strong style={{ color: '#fff' }}>Growth Focus (6):</strong> {assignedPowers[6]}</div>
                  <div>⚠️ <strong style={{ color: '#fff' }}>Delegation / Kryptonite (0):</strong> {assignedPowers[0]}</div>
                </div>
              </div>

              {/* 🤖 2. AI INSIGHTS & ANALYTICS */}
              <div style={{ marginTop: '16px', background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(168,85,247,0.1))', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '16px', padding: '16px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#38bdf8', fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🤖 AI Leadership Insights
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                  <div>• {aiInsights.coreStrength}</div>
                  <div>• {aiInsights.developmentArea}</div>
                  <div>• {aiInsights.growthTip}</div>
                </div>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.7rem', color: '#64748b' }}>
                www.nakedleader.com • Fun, Sharing & Adventure
              </div>
            </motion.div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowDeckView(false)} style={{ padding: '10px 18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', background: '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>✏️ Edit Card</button>
              <button onClick={() => window.print()} style={{ padding: '10px 18px', borderRadius: '20px', border: 'none', background: '#38bdf8', color: '#000', cursor: 'pointer', fontWeight: '900' }}>🖨️ Print Card</button>
              <button onClick={() => setShowShareModal(true)} style={{ padding: '10px 18px', borderRadius: '20px', border: 'none', background: '#ec4899', color: '#fff', cursor: 'pointer', fontWeight: '900' }}>🤝 Ask Opinions</button>
            </div>

            {showShareModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '100%', color: '#fff', textAlign: 'left' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Share & Get Peer Opinions 🤝</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.4' }}>Encourage friends and colleagues to share their opinions on your strengths!</p>
                  <input type="text" readOnly value={`https://www.nakedleader.com/share?user=${encodeURIComponent(user?.name)}`} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', color: '#38bdf8', fontSize: '0.78rem', margin: '10px 0', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => setShowShareModal(false)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: '#334155', color: '#fff', cursor: 'pointer' }}>Close</button>
                    <button onClick={() => { navigator.clipboard.writeText(`https://www.nakedleader.com/share?user=${encodeURIComponent(user?.name)}`); alert('Link copied!'); }} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: '#38bdf8', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Copy Link</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
// ==========================================
// 4. MAIN ROUTER COMPONENT
// ==========================================
export default function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState('auth'); // 'auth' -> 'intro' -> 'builder'
  const [mode, setMode] = useState('personal'); // 'personal' or 'professional'

  return (
    <>
      {step === 'auth' && <AuthPage onAuthSuccess={(u) => { setUser(u); setStep('intro'); }} />}
      {step === 'intro' && <IntroScreen user={user} mode={mode} setMode={setMode} onContinue={() => setStep('builder')} onBackToIntro={() => {setUser(null); setStep('auth')}}/>}
      {step === 'builder' && <PowersBuilder user={user} mode={mode} onBackToIntro={() => setStep('intro')} />}
    </>
  );
}
