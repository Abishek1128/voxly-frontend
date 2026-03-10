//====================================================================================================================


// import React, { useState, useRef } from "react";
// import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const InterviewSession = () => {
//   const location    = useLocation();
//   const initialData = location.state;

//   const [question, setQuestion]                   = useState(initialData?.question);
//   const [questionNumber, setQuestionNumber]        = useState(1);
//   const [totalQuestions]                           = useState(initialData?.total_questions);
//   const [isSubmitting, setIsSubmitting]            = useState(false);
//   const [answer, setAnswer]                        = useState("");
//   const [isAnswerSubmitted, setIsAnswerSubmitted]  = useState(false);
//   const [isRecording, setIsRecording]              = useState(false);
//   const [audioBlob, setAudioBlob]                  = useState(null);
//   const [feedback, setFeedback]                    = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const navigate   = useNavigate();
//   const sessionId  = localStorage.getItem("session_id");
//   const mode       = initialData?.mode ?? "practice";   // "practice" | "interview"

//   const handleSubmitAnswer = async () => {
//     if (!audioBlob && !answer.trim()) { alert("Please provide an answer."); return; }
//     const formData = new FormData();
//     formData.append("session_id", sessionId);
//     if (audioBlob) formData.append("audio_file", audioBlob);
//     else           formData.append("text_answer", answer);

//     try {
//       setIsSubmitting(true);
//       const res  = await axios.post(
//         "http://127.0.0.1:8000/interview/answer",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       const data = res.data;
//       setFeedback(data);
//       if (data.transcribed_text) setAnswer(data.transcribed_text);
//       setIsAnswerSubmitted(true);
//       setAudioBlob(null);

//       if (data.next_question?.completed) {
//         // wait a beat then go to the correct report page based on mode
//         setTimeout(() => {
//           if (mode === "interview") {
//             navigate(`/report/${sessionId}`);
//           } else {
//             navigate(`/summary/${sessionId}`);
//           }
//         }, 1500);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong submitting your answer.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (!feedback?.next_question) return;
//     setQuestion(feedback.next_question.question);
//     setQuestionNumber(p => p + 1);
//     setAnswer(""); setAudioBlob(null); setFeedback(null); setIsAnswerSubmitted(false);
//   };

//   const startRecording = async () => {
//     const stream        = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;
//     let chunks = [];
//     mediaRecorder.ondataavailable = e  => chunks.push(e.data);
//     mediaRecorder.onstop          = () => setAudioBlob(new Blob(chunks, { type: "audio/webm" }));
//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
//     setIsRecording(false);
//   };

//   const total = totalQuestions || 5;

//   return (
//     <div className="min-h-screen relative overflow-hidden" style={{ background: "#04040a" }}>
//       <div className="absolute rounded-full animate-orb pointer-events-none" style={{ width: 450, height: 450, background: "rgba(123,63,242,0.12)", top: 0, right: 0, filter: "blur(90px)" }} />
//       <div className="absolute rounded-full animate-orb pointer-events-none" style={{ width: 350, height: 350, background: "rgba(0,209,255,0.08)", bottom: 0, left: 0, filter: "blur(90px)", animationDelay: "6s" }} />
//       <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
//       <Navbar />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 pt-20 pb-16">

//         {/* Progress */}
//         <div className="flex items-center gap-2 mb-6 animate-fade-up">
//           {Array.from({ length: total }).map((_, i) => (
//             <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-300"
//               style={{ background: i < questionNumber ? "linear-gradient(90deg, #00D1FF, #7B3FF2)" : "rgba(255,255,255,0.08)" }} />
//           ))}
//           <span className="text-xs text-white/35 whitespace-nowrap ml-1">{questionNumber} of {total}</span>
//         </div>

//         {/* Main card */}
//         <div className="rounded-2xl p-9 mb-5 animate-fade-up-2"
//           style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>

//           {/* Question */}
//           <div className="text-center mb-8">
//             <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-widest mb-4"
//               style={{ background: "rgba(123,63,242,0.18)", border: "1px solid rgba(123,63,242,0.4)", color: "#7B3FF2" }}>
//               Question {questionNumber} of {total}
//             </span>
//             <h2 className="text-xl font-bold leading-relaxed" style={{ fontFamily: "'Syne', sans-serif" }}>{question}</h2>
//           </div>

//           {/* Mic section */}
//           {!isAnswerSubmitted && (
//             <div className="flex flex-col items-center gap-4 mb-7">
//               <div className="relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
//                 {isRecording && [1, 2, 3].map(n => (
//                   <div key={n} className="absolute rounded-full animate-mic-pulse"
//                     style={{ width: 60 + n * 26, height: 60 + n * 26, border: "1px solid #00D1FF", animationDelay: `${n * 0.45}s` }} />
//                 ))}
//                 <button
//                   onClick={isRecording ? stopRecording : startRecording}
//                   disabled={isSubmitting}
//                   className="relative z-10 rounded-full flex items-center justify-center transition-all duration-300"
//                   style={{
//                     width: 64, height: 64,
//                     background: isRecording ? "linear-gradient(135deg, #FF2FB3, #7B3FF2)" : "linear-gradient(135deg, rgba(0,209,255,0.2), rgba(123,63,242,0.3))",
//                     border: `2px solid ${isRecording ? "rgba(255,47,179,0.7)" : "rgba(0,209,255,0.6)"}`,
//                     boxShadow: isRecording ? "0 0 36px rgba(255,47,179,0.55)" : "0 0 22px rgba(0,209,255,0.35)",
//                   }}>
//                   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//                     <rect x="9" y="2" width="6" height="11" rx="3" fill={isRecording ? "#fff" : "#00D1FF"} />
//                     <path d="M5 10a7 7 0 0014 0" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
//                     <line x1="12" y1="17" x2="12" y2="21" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
//                     <line x1="9" y1="21" x2="15" y2="21" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </button>
//               </div>

//               {isRecording && (
//                 <div className="flex items-center gap-0.5" style={{ height: 40 }}>
//                   {Array.from({ length: 24 }).map((_, i) => (
//                     <div key={i} className="animate-wave-bar rounded-sm"
//                       style={{ width: 3, background: "linear-gradient(to top, #00D1FF, #7B3FF2)", height: `${18 + Math.sin(i * 0.9) * 14}px`, animationDelay: `${(i * 0.05).toFixed(2)}s` }} />
//                   ))}
//                 </div>
//               )}

//               <div className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
//                 style={{
//                   background: isRecording ? "rgba(255,47,179,0.12)" : audioBlob ? "rgba(0,209,255,0.12)" : "rgba(255,255,255,0.04)",
//                   border: `1px solid ${isRecording ? "rgba(255,47,179,0.4)" : audioBlob ? "rgba(0,209,255,0.35)" : "rgba(255,255,255,0.1)"}`,
//                   color: isRecording ? "#FF2FB3" : audioBlob ? "#00D1FF" : "rgba(255,255,255,0.4)",
//                 }}>
//                 {isRecording ? "🔴 Recording..." : audioBlob ? "✓ Recording saved" : "Click mic to start recording"}
//               </div>
//             </div>
//           )}

//           {/* Answer textarea */}
//           <div className="mb-5">
//             <label className="block text-xs text-white/45 mb-2">{isAnswerSubmitted ? "Your Answer (Transcript)" : "Or type your answer"}</label>
//             <textarea rows={5} value={answer}
//               onChange={e => !isAnswerSubmitted && setAnswer(e.target.value)}
//               readOnly={isAnswerSubmitted}
//               placeholder={isAnswerSubmitted ? "" : "Start typing your answer here..."}
//               className="w-full px-4 py-3 rounded-xl text-sm text-white leading-relaxed outline-none resize-none transition-all duration-200"
//               style={{
//                 background: isAnswerSubmitted ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
//                 border: `1px solid ${isAnswerSubmitted ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"}`,
//                 fontFamily: "'DM Sans', sans-serif",
//                 cursor: isAnswerSubmitted ? "default" : "text",
//               }}
//               onFocus={e => { if (!isAnswerSubmitted) { e.target.style.borderColor = "rgba(0,209,255,0.55)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,209,255,0.1)"; }}}
//               onBlur={e  => { e.target.style.borderColor = isAnswerSubmitted ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
//             />
//           </div>

//           {/* Eval criteria */}
//           {!isAnswerSubmitted && (
//             <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
//               <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2.5">Evaluation Criteria</p>
//               <div className="flex flex-wrap gap-2">
//                 {["Relevance", "Clarity", "Confidence", "Filler Words"].map(c => (
//                   <span key={c} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
//                     style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>{c}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Action buttons */}
//           {!isAnswerSubmitted ? (
//             <div className="flex gap-2.5">
//               <button onClick={isRecording ? stopRecording : startRecording} disabled={isSubmitting}
//                 className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all duration-200"
//                 style={{
//                   background: isRecording ? "rgba(255,47,179,0.1)" : "rgba(255,255,255,0.04)",
//                   border: `1px solid ${isRecording ? "rgba(255,47,179,0.35)" : "rgba(255,255,255,0.1)"}`,
//                   color: isRecording ? "#FF2FB3" : "rgba(255,255,255,0.7)",
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}>
//                 {isRecording ? "⏹ Stop Recording" : "🎙 Start Recording"}
//               </button>
//               <button onClick={handleSubmitAnswer} disabled={isSubmitting || (!answer.trim() && !audioBlob)}
//                 className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
//                 style={{ background: "linear-gradient(135deg, #00D1FF, #7B3FF2)", backgroundSize: "200%", boxShadow: "0 4px 20px rgba(0,209,255,0.25)" }}>
//                 {isSubmitting ? <><div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /><span>Processing...</span></> : "✓ Submit Answer"}
//               </button>
//             </div>
//           ) : (
//             <div className="flex justify-center">
//               <button onClick={handleNextQuestion}
//                 disabled={!feedback?.next_question || feedback?.next_question?.completed}
//                 className="flex items-center justify-center px-10 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
//                 style={{ background: "linear-gradient(135deg, #00D1FF, #7B3FF2)", backgroundSize: "200%", boxShadow: "0 4px 20px rgba(0,209,255,0.25)" }}>
//                 {feedback?.next_question?.completed ? "Finishing..." : "Next Question →"}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Evaluation results — only shown in practice mode */}
//         {feedback && isAnswerSubmitted && mode === "practice" && (
//           <div className="rounded-2xl p-8 animate-fade-up"
//             style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
//             <h3 className="flex items-center gap-2 text-lg font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
//               <TrendingUp size={17} color="#00D1FF" /> Answer Evaluation
//             </h3>

//             <div className="grid grid-cols-3 gap-3.5 mb-5">
//               {[
//                 { label: "Relevance Score",  value: Math.round((feedback.score || 0) * 100), unit: "%",  color: "#00D1FF" },
//                 { label: "Voice Confidence", value: Math.round((feedback.confidence || 0) * 100), unit: "%", color: "#7B3FF2" },
//                 { label: "Filler Words",     value: feedback.filler_words || 0, unit: "",   color: "#FFB800" },
//               ].map((m, i) => (
//                 <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${m.color}22` }}>
//                   <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: m.color }}>{m.label}</p>
//                   <p className="font-extrabold text-2xl" style={{ fontFamily: "'Syne', sans-serif", color: m.color }}>
//                     {m.value}<span className="text-xs font-normal" style={{ color: `${m.color}77` }}>{m.unit}</span>
//                   </p>
//                   {m.unit === "%" && (
//                     <div className="mt-2.5 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
//                       <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.value}%`, background: m.color, boxShadow: `0 0 6px ${m.color}66` }} />
//                     </div>
//                   )}
//                   {m.unit === "" && <p className="text-[10px] mt-1.5" style={{ color: `${m.color}88` }}>{m.value === 0 ? "Clean delivery!" : m.value <= 3 ? "Acceptable" : "Try to reduce"}</p>}
//                 </div>
//               ))}
//             </div>

//             {feedback.insight && (
//               <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{ background: "rgba(0,209,255,0.05)", border: "1px solid rgba(0,209,255,0.2)" }}>
//                 <CheckCircle size={16} color="#00D1FF" className="shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-semibold mb-1">AI Feedback</p>
//                   <p className="text-xs text-white/55 leading-relaxed">{feedback.insight}</p>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end">
//               {(feedback.score || 0) >= 0.7 ? (
//                 <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,209,255,0.12)", border: "1px solid rgba(0,209,255,0.35)", color: "#00D1FF" }}>
//                   <CheckCircle size={12} /> Great answer!
//                 </span>
//               ) : (feedback.score || 0) >= 0.4 ? (
//                 <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.35)", color: "#FFB800" }}>
//                   <AlertCircle size={12} /> Could be stronger
//                 </span>
//               ) : (
//                 <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,47,179,0.12)", border: "1px solid rgba(255,47,179,0.35)", color: "#FF2FB3" }}>
//                   <AlertCircle size={12} /> Needs improvement
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Interview mode — hide per-answer feedback, show suspense message */}
//         {feedback && isAnswerSubmitted && mode === "interview" && !feedback?.next_question?.completed && (
//           <div className="rounded-2xl p-6 animate-fade-up text-center"
//             style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
//             <p className="text-sm text-white/40">Answer recorded. Scores revealed at the end.</p>
//           </div>
//         )}

//         {isSubmitting && (
//           <div className="flex flex-col items-center gap-3 mt-6">
//             <div className="w-8 h-8 rounded-full border-[3px] border-white/15 border-t-[#00D1FF] animate-spin" />
//             <p className="text-xs text-white/40">Analyzing your answer... Please wait.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewSession;




import React, { useState, useRef } from "react";
import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const InterviewSession = () => {
  const location    = useLocation();
  const navigate    = useNavigate();
  const initialData = location.state;

  // ── Guard: redirect if no session configured ──────────────────────
  if (!initialData?.question || !initialData?.session_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5"
        style={{ background: "#04040a", fontFamily: "'DM Sans', sans-serif" }}>
        <p className="text-white/40 text-sm">No interview configured.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#00D1FF,#7B3FF2)", boxShadow: "0 4px 20px rgba(0,209,255,0.25)" }}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const [question, setQuestion]                   = useState(initialData?.question);
  const [questionNumber, setQuestionNumber]        = useState(1);
  const [totalQuestions]                           = useState(initialData?.total_questions);
  const [isSubmitting, setIsSubmitting]            = useState(false);
  const [answer, setAnswer]                        = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted]  = useState(false);
  const [isRecording, setIsRecording]              = useState(false);
  const [audioBlob, setAudioBlob]                  = useState(null);
  const [feedback, setFeedback]                    = useState(null);
  const [micReady, setMicReady]                   = useState(false);  // stream pre-warmed
  const [recordingStatus, setRecordingStatus]     = useState("idle"); // idle | starting | recording | stopping
  const mediaRecorderRef = useRef(null);
  const streamRef        = useRef(null);   // keep stream alive between questions
  const sessionId  = initialData?.session_id ?? localStorage.getItem("session_id");
  const mode       = initialData?.mode ?? "practice";   // "practice" | "interview"

  // ── Pre-warm microphone on mount so first click is instant ──────────
  React.useEffect(() => {
    let cancelled = false;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        setMicReady(true);
      })
      .catch(() => setMicReady(false));   // mic denied — still works, just slower
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const handleSubmitAnswer = async () => {
    if (!audioBlob && !answer.trim()) { alert("Please provide an answer."); return; }
    const formData = new FormData();
    formData.append("session_id", sessionId);
    if (audioBlob) formData.append("audio_file", audioBlob);
    else           formData.append("text_answer", answer);

    try {
      setIsSubmitting(true);
      const res  = await axios.post(
        `${import.meta.env.VITE_API_URL}/interview/answer`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = res.data;
      setFeedback(data);
      if (data.transcribed_text) setAnswer(data.transcribed_text);
      setIsAnswerSubmitted(true);
      setAudioBlob(null);

      if (data.next_question?.completed) {
        // call summary endpoint first — this writes average_score + verdict to DB
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/summary/${sessionId}`);
        } catch (e) {
          console.warn("Summary save failed:", e);
        }
        // then navigate to the correct report page based on mode
        setTimeout(() => {
          if (mode === "interview") {
            navigate(`/report/${sessionId}`);
          } else {
            navigate(`/summary/${sessionId}`);
          }
        }, 800);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong submitting your answer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (!feedback?.next_question) return;
    setQuestion(feedback.next_question.question);
    setQuestionNumber(p => p + 1);
    setAnswer(""); setAudioBlob(null); setFeedback(null); setIsAnswerSubmitted(false);
  };

  const startRecording = async () => {
    setRecordingStatus("starting");
    try {
      // use pre-warmed stream if available, otherwise request fresh
      let stream = streamRef.current;
      if (!stream || stream.getTracks().every(t => t.readyState === "ended")) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];
      mediaRecorder.ondataavailable = e  => chunks.push(e.data);
      mediaRecorder.onstop          = () => setAudioBlob(new Blob(chunks, { type: "audio/webm" }));
      mediaRecorder.start();
      // small rAF delay so CSS transition fires before state flip
      requestAnimationFrame(() => {
        setIsRecording(true);
        setRecordingStatus("recording");
      });
    } catch (err) {
      console.error("Mic error:", err);
      setRecordingStatus("idle");
    }
  };

  const stopRecording = () => {
    setRecordingStatus("stopping");
    requestAnimationFrame(() => {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setRecordingStatus("idle");
    });
  };

  const total = totalQuestions || 5;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#04040a" }}>
      <div className="absolute rounded-full animate-orb pointer-events-none" style={{ width: 450, height: 450, background: "rgba(123,63,242,0.12)", top: 0, right: 0, filter: "blur(90px)" }} />
      <div className="absolute rounded-full animate-orb pointer-events-none" style={{ width: 350, height: 350, background: "rgba(0,209,255,0.08)", bottom: 0, left: 0, filter: "blur(90px)", animationDelay: "6s" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <Navbar />
      <style>{`
        @keyframes micPulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.08); opacity: 0;   }
          100% { transform: scale(1.08); opacity: 0;   }
        }
        @keyframes waveBar {
          0%, 100% { transform: scaleY(1);   }
          50%       { transform: scaleY(1.9); }
        }
      `}</style>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-20 pb-16">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6 animate-fade-up">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-300"
              style={{ background: i < questionNumber ? "linear-gradient(90deg, #00D1FF, #7B3FF2)" : "rgba(255,255,255,0.08)" }} />
          ))}
          <span className="text-xs text-white/35 whitespace-nowrap ml-1">{questionNumber} of {total}</span>
        </div>

        {/* Main card */}
        <div className="rounded-2xl p-9 mb-5 animate-fade-up-2"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>

          {/* Question */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-widest mb-4"
              style={{ background: "rgba(123,63,242,0.18)", border: "1px solid rgba(123,63,242,0.4)", color: "#7B3FF2" }}>
              Question {questionNumber} of {total}
            </span>
            <h2 className="text-xl font-bold leading-relaxed" style={{ fontFamily: "'Syne', sans-serif" }}>{question}</h2>
          </div>

          {/* Mic section */}
          {!isAnswerSubmitted && (
            <div className="flex flex-col items-center gap-4 mb-7">
              <div className="relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
                {(isRecording || recordingStatus === "starting") && [1, 2, 3].map(n => (
                  <div key={n} className="absolute rounded-full"
                    style={{
                      width: 60 + n * 26, height: 60 + n * 26,
                      border: `1px solid ${isRecording ? "#00D1FF" : "rgba(0,209,255,0.4)"}`,
                      opacity: isRecording ? 1 : 0,
                      animation: isRecording ? `micPulse 1.8s ease-out infinite` : "none",
                      animationDelay: `${n * 0.45}s`,
                      transition: "opacity 0.4s ease, border-color 0.4s ease",
                    }} />
                ))}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isSubmitting}
                  className="relative z-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: 64, height: 64,
                    background: isRecording ? "linear-gradient(135deg, #FF2FB3, #7B3FF2)" : recordingStatus === "starting" ? "linear-gradient(135deg, rgba(255,47,179,0.3), rgba(123,63,242,0.5))" : "linear-gradient(135deg, rgba(0,209,255,0.2), rgba(123,63,242,0.3))",
                    border: `2px solid ${isRecording ? "rgba(255,47,179,0.7)" : "rgba(0,209,255,0.6)"}`,
                    boxShadow: isRecording ? "0 0 36px rgba(255,47,179,0.55)" : "0 0 22px rgba(0,209,255,0.35)",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="11" rx="3" fill={isRecording ? "#fff" : "#00D1FF"} />
                    <path d="M5 10a7 7 0 0014 0" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="17" x2="12" y2="21" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="9" y1="21" x2="15" y2="21" stroke={isRecording ? "#fff" : "#00D1FF"} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {isRecording && (
                <div className="flex items-center gap-0.5" style={{ height: 40 }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="rounded-sm"
                      style={{ width: 3, background: "linear-gradient(to top, #00D1FF, #7B3FF2)", height: `${18 + Math.sin(i * 0.9) * 14}px`, animation: "waveBar 0.6s ease-in-out infinite", animationDelay: `${(i * 0.07).toFixed(2)}s` }} />
                  ))}
                </div>
              )}

              <div className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500"
                style={{
                  background: isRecording ? "rgba(255,47,179,0.12)" : audioBlob ? "rgba(0,209,255,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isRecording ? "rgba(255,47,179,0.4)" : audioBlob ? "rgba(0,209,255,0.35)" : "rgba(255,255,255,0.1)"}`,
                  color: isRecording ? "#FF2FB3" : audioBlob ? "#00D1FF" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.01em",
                }}>
                {recordingStatus === "starting" ? "⏳ Starting..." :
                 isRecording                    ? "🔴 Click mic to stop recording" :
                 recordingStatus === "stopping" ? "⏳ Saving..." :
                 audioBlob                      ? "✓ Recording saved" :
                                                  "Click mic to start recording"}
              </div>
            </div>
          )}

          {/* Answer textarea */}
          <div className="mb-5">
            <label className="block text-xs text-white/45 mb-2">{isAnswerSubmitted ? "Your Answer (Transcript)" : "Or type your answer"}</label>
            <textarea rows={5} value={answer}
              onChange={e => !isAnswerSubmitted && setAnswer(e.target.value)}
              readOnly={isAnswerSubmitted}
              placeholder={isAnswerSubmitted ? "" : "Start typing your answer here..."}
              className="w-full px-4 py-3 rounded-xl text-sm text-white leading-relaxed outline-none resize-none transition-all duration-200"
              style={{
                background: isAnswerSubmitted ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isAnswerSubmitted ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"}`,
                fontFamily: "'DM Sans', sans-serif",
                cursor: isAnswerSubmitted ? "default" : "text",
              }}
              onFocus={e => { if (!isAnswerSubmitted) { e.target.style.borderColor = "rgba(0,209,255,0.55)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,209,255,0.1)"; }}}
              onBlur={e  => { e.target.style.borderColor = isAnswerSubmitted ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Eval criteria */}
          {!isAnswerSubmitted && (
            <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2.5">Evaluation Criteria</p>
              <div className="flex flex-wrap gap-2">
                {["Relevance", "Clarity", "Confidence", "Filler Words"].map(c => (
                  <span key={c} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          {!isAnswerSubmitted ? (
            <div className="flex gap-2.5">
              <button onClick={isRecording ? stopRecording : startRecording} disabled={isSubmitting}
                className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isRecording ? "rgba(255,47,179,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isRecording ? "rgba(255,47,179,0.35)" : "rgba(255,255,255,0.1)"}`,
                  color: isRecording ? "#FF2FB3" : "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {isRecording ? "⏹ Stop Recording" : "🎙 Start Recording"}
              </button>
              <button onClick={handleSubmitAnswer} disabled={isSubmitting || (!answer.trim() && !audioBlob)}
                className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #00D1FF, #7B3FF2)", backgroundSize: "200%", boxShadow: "0 4px 20px rgba(0,209,255,0.25)" }}>
                {isSubmitting ? <><div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /><span>Processing...</span></> : "✓ Submit Answer"}
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button onClick={handleNextQuestion}
                disabled={!feedback?.next_question || feedback?.next_question?.completed}
                className="flex items-center justify-center px-10 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #00D1FF, #7B3FF2)", backgroundSize: "200%", boxShadow: "0 4px 20px rgba(0,209,255,0.25)" }}>
                {feedback?.next_question?.completed ? "Finishing..." : "Next Question →"}
              </button>
            </div>
          )}
        </div>

        {/* Evaluation results — only shown in practice mode */}
        {feedback && isAnswerSubmitted && mode === "practice" && (
          <div className="rounded-2xl p-8 animate-fade-up"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
            <h3 className="flex items-center gap-2 text-lg font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              <TrendingUp size={17} color="#00D1FF" /> Answer Evaluation
            </h3>

            <div className="grid grid-cols-3 gap-3.5 mb-5">
              {[
                { label: "Relevance Score",  value: Math.round((feedback.score || 0) * 100), unit: "%", color: "#00D1FF" },
                { label: "Voice Confidence", value: Math.round((feedback.confidence || 0) * 100), unit: "%", color: "#7B3FF2",
                  sublabel: feedback.confidence_label ?? null },
                { label: "Filler Words",     value: feedback.filler_words ?? 0, unit: "", color: "#FFB800" },
              ].map((m, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${m.color}22` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: m.color }}>{m.label}</p>
                  {m.value === null ? (
                    <>
                      <p className="font-extrabold text-2xl" style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.2)" }}>N/A</p>
                      <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>Text answer</p>
                    </>
                  ) : (
                    <>
                      <p className="font-extrabold text-2xl" style={{ fontFamily: "'Syne', sans-serif", color: m.color }}>
                        {m.value}<span className="text-xs font-normal" style={{ color: `${m.color}77` }}>{m.unit}</span>
                      </p>
                      {m.unit === "%" && (
                        <>
                          <div className="mt-2.5 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.value}%`, background: m.color, boxShadow: `0 0 6px ${m.color}66` }} />
                          </div>
                          {m.sublabel && <p className="text-[10px] mt-1.5 font-semibold" style={{ color: `${m.color}cc` }}>{m.sublabel}</p>}
                        </>
                      )}
                      {m.unit === "" && <p className="text-[10px] mt-1.5" style={{ color: `${m.color}88` }}>{m.value === 0 ? "Clean delivery!" : m.value <= 3 ? "Acceptable" : "Try to reduce"}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>

            {feedback.insight && (
              <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{ background: "rgba(0,209,255,0.05)", border: "1px solid rgba(0,209,255,0.2)" }}>
                <CheckCircle size={16} color="#00D1FF" className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">AI Feedback</p>
                  <p className="text-xs text-white/55 leading-relaxed">{feedback.insight}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              {(feedback.score || 0) >= 0.7 ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,209,255,0.12)", border: "1px solid rgba(0,209,255,0.35)", color: "#00D1FF" }}>
                  <CheckCircle size={12} /> Great answer!
                </span>
              ) : (feedback.score || 0) >= 0.4 ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.35)", color: "#FFB800" }}>
                  <AlertCircle size={12} /> Could be stronger
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,47,179,0.12)", border: "1px solid rgba(255,47,179,0.35)", color: "#FF2FB3" }}>
                  <AlertCircle size={12} /> Needs improvement
                </span>
              )}
            </div>
          </div>
        )}

        {/* Interview mode — hide per-answer feedback, show suspense message */}
        {feedback && isAnswerSubmitted && mode === "interview" && !feedback?.next_question?.completed && (
          <div className="rounded-2xl p-6 animate-fade-up text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm text-white/40">Answer recorded. Scores revealed at the end.</p>
          </div>
        )}

        {isSubmitting && (
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="w-8 h-8 rounded-full border-[3px] border-white/15 border-t-[#00D1FF] animate-spin" />
            <p className="text-xs text-white/40">Analyzing your answer... Please wait.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;