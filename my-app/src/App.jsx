// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [text, setText] = useState("");
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSummarize = async () => {
//     if (!text.trim()) {
//       setError("Please enter some text to summarize.");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     setSummary("");

//     try {
//       const response = await axios.post("http://localhost:5000/summarize", { text });
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>📝 AI Note Summarizer</h1>
//       <textarea
//         placeholder="Paste your text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button onClick={handleSummarize} disabled={loading}>
//         {loading ? "Summarizing..." : "Summarize"}
//       </button>
//       {error && <p className="error">{error}</p>}
//       {summary && (
//         <div className="summary-box">
//           <h3>Summary:</h3>
//           <p>{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-8">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            📝 AI Note Summarizer
          </h1>
          <p className="text-xl text-purple-200">
            Transform your lengthy text into concise summaries instantly
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <textarea
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 text-white text-lg placeholder-purple-200/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 resize-none transition-all duration-300 shadow-lg"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Summarizing...
              </span>
            ) : (
              "Summarize"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-5 bg-red-500/20 border-2 border-red-400/50 rounded-2xl backdrop-blur-sm">
            <p className="text-red-200 text-lg font-medium text-center">{error}</p>
          </div>
        )}

        {/* Summary Box */}
        {summary && (
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-4xl">✨</span>
              Summary:
            </h3>
            <p className="text-white text-lg leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-purple-200 font-medium">
            ⚡ Lightning Fast
          </div>
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-purple-200 font-medium">
            🎯 AI Powered
          </div>
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-purple-200 font-medium">
            🔒 Secure & Private
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;