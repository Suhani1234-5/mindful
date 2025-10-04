
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }
    setError("");
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4 md:p-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-black to-fuchsia-950"></div>
      
      {/* Animated Mesh Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-600 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-fuchsia-600 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-cyan-600 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Main Glass Card */}
      <div className="w-full max-w-5xl relative z-10">
        <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.15)] border border-white/10 p-6 md:p-10 lg:p-12">
          
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:via-fuchsia-500/10 group-hover:to-cyan-500/10 transition-all duration-700"></div>

          {/* Header */}
          <div className="relative text-center mb-10 md:mb-12">
            <div className="inline-block mb-4">
              <div className="text-6xl md:text-7xl mb-2 animate-bounce" style={{animationDuration: '3s'}}>✨</div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 mb-3 tracking-tight leading-tight">
              AI Summarizer
            </h1>
            <p className="text-base md:text-lg text-gray-300 font-light tracking-wide">
              Intelligence meets simplicity • Powered by cutting-edge AI
            </p>
          </div>

          {/* Input Section with Glass Effect */}
          <div className="mb-6 md:mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
            <textarea
              placeholder="Enter your text and watch the magic happen..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="relative w-full h-56 md:h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] resize-none transition-all duration-300 shadow-2xl"
            />
          </div>

          {/* Button with Gradient and Glow */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="relative px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white text-lg md:text-xl font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:hover:scale-100 disabled:hover:translate-y-0 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center gap-3 justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Magic...
                  </>
                ) : (
                  <>
                    <span>Summarize Now</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Error Message with Animation */}
          {error && (
            <div className="mb-8 p-4 md:p-5 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-xl animate-pulse">
              <p className="text-red-300 text-base md:text-lg font-medium text-center flex items-center justify-center gap-2">
                <span className="text-xl">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Summary Section with Elegant Design */}
          {summary && (
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.1)] animate-fade-in">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl md:text-2xl">
                  ✨
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                  Your Summary
                </h3>
              </div>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Feature Tags with Modern Design */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
            {[
              { icon: "⚡", text: "Instant Results" },
              { icon: "🧠", text: "AI Powered" },
              { icon: "🔐", text: "100% Private" },
              { icon: "🎯", text: "Accurate" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="px-5 md:px-6 py-2 md:py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-gray-300 font-medium text-sm md:text-base hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-default hover:scale-105"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;