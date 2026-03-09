import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, TrendingUp, Shield, Zap, Star, ChevronRight } from "lucide-react";

const S = {
  page: { minHeight:"100vh", background:"#04040a", color:"#fff", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" },
  orb: (w,h,bg,t,r,b,l,dur) => ({ position:"absolute", width:w, height:h, background:bg, borderRadius:"50%", filter:"blur(100px)", pointerEvents:"none", animation:`orbFloat ${dur}s ease-in-out infinite`, top:t, right:r, bottom:b, left:l }),
  grid: { position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px" },
  section: { position:"relative", zIndex:1 },
  card: (border) => ({ background:"rgba(255,255,255,0.03)", border:`1px solid ${border||"rgba(255,255,255,0.07)"}`, backdropFilter:"blur(20px)", borderRadius:20 }),
  btnPrimary: { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg,#00D1FF,#7B3FF2)", border:"none", color:"#fff", fontWeight:600, borderRadius:14, padding:"14px 30px", cursor:"pointer", fontSize:15, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 28px rgba(0,209,255,0.3)", transition:"all 0.2s" },
  btnGhost: { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.75)", fontWeight:500, borderRadius:14, padding:"13px 28px", cursor:"pointer", fontSize:15, fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" },
};

const features = [
  { icon:<Mic size={22} color="#00D1FF"/>, title:"Voice Analysis", desc:"Real-time speech recognition with filler word detection and confidence scoring on every answer.", color:"#00D1FF" },
  { icon:<TrendingUp size={22} color="#7B3FF2"/>, title:"Instant Feedback", desc:"AI-powered evaluation across relevance, clarity, and delivery. Know exactly where to improve.", color:"#7B3FF2" },
  { icon:<Shield size={22} color="#FF2FB3"/>, title:"Practice or Interview", desc:"Choose practice mode for per-answer coaching, or interview mode for a realistic full session.", color:"#FF2FB3" },
  { icon:<Zap size={22} color="#FFB800"/>, title:"Smart Reports", desc:"Detailed skill-wise breakdown with personalized suggestions you can act on immediately.", color:"#FFB800" },
];

const steps = [
  { n:"01", title:"Choose Your Role",    desc:"Select from front-end, back-end, ML, and more. Pick your difficulty and session length." },
  { n:"02", title:"Answer Out Loud",     desc:"Speak your answers naturally. Our ASR engine transcribes and analyzes your voice in real time." },
  { n:"03", title:"Get Instant Scoring", desc:"See scores for relevance, clarity, confidence, and filler words after each question." },
  { n:"04", title:"Read Your Report",    desc:"Get a full session report with skill ratings, communication analysis, and a final verdict." },
];

const testimonials = [
  { name:"Priya S.", role:"Got hired at Google", text:"I used VOXLY for two weeks before my interview. The filler word tracker alone changed how I communicate.", stars:5 },
  { name:"Arjun M.", role:"SWE at Razorpay", text:"Practice mode with instant feedback is genius. I could iterate on answers until they sounded right.", stars:5 },
  { name:"Sneha R.", role:"ML Engineer at Flipkart", text:"The AI feedback is brutally honest — exactly what you need before a real interview. Highly recommend.", stars:5 },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={S.page}>

      {/* ── Navbar ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100, height:62,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px", transition:"background 0.3s",
        background: scrolled ? "rgba(4,4,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,#00D1FF,#7B3FF2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color:"#fff", boxShadow:"0 0 16px rgba(0,209,255,0.4)" }}>V</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18, color:"#fff", letterSpacing:"-0.02em" }}>VOXLY</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button style={{ ...S.btnGhost, padding:"9px 20px", fontSize:14 }} onClick={() => navigate("/login")}>Sign In</button>
          <button style={{ ...S.btnPrimary, padding:"9px 22px", fontSize:14 }} onClick={() => navigate("/register")}>Get Started Free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position:"relative", overflow:"hidden", paddingTop:160, paddingBottom:120, textAlign:"center" }}>
        <div style={S.orb(700,700,"rgba(123,63,242,0.2)",-100,-180,"auto","auto",14)} />
        <div style={S.orb(600,600,"rgba(0,209,255,0.15)","auto","auto",-120,-120,11)} />
        <div style={S.orb(400,400,"rgba(255,47,179,0.1)",200,-60,"auto","auto",17)} />
        <div style={S.grid} />

        <div style={{ position:"relative", zIndex:1, maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
          <span className="animate-fade-up" style={{ display:"inline-block", padding:"4px 14px", borderRadius:999, fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", background:"rgba(0,209,255,0.1)", border:"1px solid rgba(0,209,255,0.35)", color:"#00D1FF", marginBottom:24 }}>
            AI-Powered Interview Prep
          </span>
          <h1 className="animate-fade-up-2" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:58, lineHeight:1.12, letterSpacing:"-0.03em", margin:"0 0 24px" }}>
            Ace Your Next<br />
            <span className="grad-text">Technical Interview</span>
          </h1>
          <p className="animate-fade-up-3" style={{ fontSize:18, color:"rgba(255,255,255,0.5)", lineHeight:1.7, margin:"0 auto 40px", maxWidth:540 }}>
            Practice with voice-based AI interviews. Get real-time feedback on clarity, confidence, and relevance — before the real thing.
          </p>
          <div className="animate-fade-up-4" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={S.btnPrimary} onClick={() => navigate("/register")}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 36px rgba(0,209,255,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 28px rgba(0,209,255,0.3)"; }}>
              <Mic size={17} /> Start Practicing Free
            </button>
            <button style={S.btnGhost} onClick={() => navigate("/login")}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(0,209,255,0.4)"; e.currentTarget.style.background="rgba(0,209,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}>
              Sign In <ChevronRight size={15} />
            </button>
          </div>

          {/* Floating score card preview */}
          <div className="animate-fade-up-4" style={{ marginTop:72, display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
            {[
              { label:"Relevance",   pct:82, color:"#00D1FF" },
              { label:"Confidence",  pct:74, color:"#7B3FF2" },
              { label:"Filler Words",pct:91, color:"#FF2FB3" },
            ].map((m,i) => (
              <div key={i} style={{ ...S.card(), padding:"18px 24px", minWidth:140, textAlign:"left" }}>
                <p style={{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", color:m.color, marginBottom:8, marginTop:0 }}>{m.label}</p>
                <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:m.color, margin:"0 0 8px" }}>{m.pct}%</p>
                <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${m.pct}%`, background:m.color, borderRadius:2, boxShadow:`0 0 8px ${m.color}77` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ ...S.section, padding:"100px 40px", maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:36, letterSpacing:"-0.02em", margin:"0 0 14px" }}>
            Everything You Need to <span className="grad-text">Perform</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:16, margin:0 }}>Four pillars that make VOXLY the most effective interview prep tool.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
          {features.map((f,i) => (
            <div key={i} style={{ ...S.card(), padding:"26px 22px", transition:"all 0.25s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${f.color}44`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,0.35), 0 0 24px ${f.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:`${f.color}18`, border:`1px solid ${f.color}33`, marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16, margin:"0 0 8px" }}>{f.title}</h3>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.65, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ ...S.section, padding:"80px 40px", maxWidth:880, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:36, letterSpacing:"-0.02em", margin:"0 0 14px" }}>How It Works</h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:16, margin:0 }}>From setup to feedback in under 5 minutes.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {steps.map((s,i) => (
            <div key={i} style={{ ...S.card(), padding:"22px 26px", display:"flex", alignItems:"flex-start", gap:20 }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:"rgba(0,209,255,0.25)", flexShrink:0, lineHeight:1 }}>{s.n}</span>
              <div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16, margin:"0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.65, margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ ...S.section, padding:"80px 40px", maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:36, letterSpacing:"-0.02em", margin:"0 0 14px" }}>
            People Who Got <span className="grad-text">Hired</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:16, margin:0 }}>Real results from real candidates.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {testimonials.map((t,i) => (
            <div key={i} style={{ ...S.card(), padding:"24px 22px" }}>
              <div style={{ display:"flex", gap:2, marginBottom:14 }}>
                {Array(t.stars).fill(0).map((_,j) => <Star key={j} size={14} fill="#FFB800" color="#FFB800" />)}
              </div>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:"0 0 18px", fontStyle:"italic" }}>"{t.text}"</p>
              <div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, margin:"0 0 2px" }}>{t.name}</p>
                <p style={{ fontSize:12, color:"#00D1FF", margin:0 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position:"relative", overflow:"hidden", padding:"100px 40px", textAlign:"center" }}>
        <div style={S.orb(500,500,"rgba(123,63,242,0.18)","auto","auto",-100,-100,12)} />
        <div style={S.orb(400,400,"rgba(0,209,255,0.12)",-80,-80,"auto","auto",9)} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:40, letterSpacing:"-0.02em", margin:"0 0 16px" }}>
            Ready to <span className="grad-text">Start Practicing?</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, margin:"0 auto 36px", maxWidth:460, lineHeight:1.7 }}>
            Join thousands of engineers who use VOXLY to land their dream roles.
          </p>
          <button style={S.btnPrimary} onClick={() => navigate("/register")}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 36px rgba(0,209,255,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 28px rgba(0,209,255,0.3)"; }}>
            <Mic size={17} /> Create Free Account
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"28px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#00D1FF,#7B3FF2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:13, color:"#fff" }}>V</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:"rgba(255,255,255,0.7)" }}>VOXLY</span>
        </div>
        <p style={{ color:"rgba(255,255,255,0.2)", fontSize:12, margin:0 }}>© 2026 VOXLY — Voice Powered Interview Intelligence</p>
      </footer>
    </div>
  );
};

export default LandingPage;
