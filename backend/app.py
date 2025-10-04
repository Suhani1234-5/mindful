# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import os
# from dotenv import load_dotenv

# # 🔹 Load environment variables from .env
# load_dotenv()

# app = Flask(__name__)

# # ✅ Proper CORS setup for Vercel frontend and preflight requests
# CORS(
#     app,
#     origins=["https://mindful-peach.vercel.app"],  # your Vercel frontend
#     methods=["GET", "POST", "OPTIONS"],
#     allow_headers=["Content-Type", "Authorization"]
# )

# # 🔑 Get Gemini API key from .env
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# if not GEMINI_API_KEY:
#     raise ValueError("GEMINI_API_KEY is missing! Add it to your .env file.")

# @app.route("/summarize", methods=["POST", "OPTIONS"])
# def summarize():
#     # ✅ Handle preflight OPTIONS request
#     if request.method == "OPTIONS":
#         return '', 200

#     data = request.get_json()
#     text = data.get("text", "")

#     if not text.strip():
#         return jsonify({"error": "Text is required"}), 400

#     try:
#         # ✅ Gemini API endpoint (OpenAI-compatible)
#         url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"

#         headers = {
#             "Content-Type": "application/json",
#             "Authorization": f"Bearer {GEMINI_API_KEY}"
#         }

#         payload = {
#             "model": "gemini-2.5-flash-lite",  # or "gemini-1.5-pro"
#             "messages": [
#                 {"role": "system", "content": "You are a helpful assistant that summarizes text."},
#                 {"role": "user", "content": f"Summarize this in 2-3 lines:\n{text}"}
#             ],
#             "max_tokens": 150,
#             "temperature": 0.5
#         }

#         response = requests.post(url, headers=headers, json=payload)

#         if response.status_code != 200:
#             print("Gemini API Error:", response.text)
#             return jsonify({
#                 "error": "Gemini API failed",
#                 "details": response.text
#             }), 500

#         # Parse summary
#         result = response.json()
#         summary = result.get("choices", [{}])[0].get("message", {}).get("content")

#         if not summary:
#             summary = result.get("responseText", "")

#         return jsonify({"summary": summary.strip()})

#     except Exception as e:
#         print("❌ Error:", e)
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     # ✅ Bind to 0.0.0.0 and use Render's PORT
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port, debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# 🔹 Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# ✅ Proper CORS setup for Vercel frontend and preflight requests
CORS(
    app,
    origins=["https://mindful-peach.vercel.app"],  # your Vercel frontend
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)

# 🔑 Get Gemini API key from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing! Add it to your .env file.")

@app.route("/", methods=["GET", "POST", "OPTIONS"])
def health_check():
    """Health check endpoint and fallback for summarize requests"""
    if request.method == "OPTIONS":
        return '', 200
    
    if request.method == "GET":
        return jsonify({"status": "OK", "message": "Mindful AI Summarizer Backend is running"})
    
    # Handle POST requests to root (fallback for old frontend versions)
    if request.method == "POST":
        return summarize()

@app.route("/summarize", methods=["POST", "OPTIONS"])
def summarize():
    # ✅ Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return '', 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Text is required"}), 400
    except Exception as e:
        print(f"❌ JSON parsing error: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    try:
        # ✅ Gemini API endpoint (OpenAI-compatible)
        url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GEMINI_API_KEY}"
        }

        payload = {
            "model": "gemini-2.5-flash-lite",  # or "gemini-1.5-pro"
            "messages": [
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Summarize this in 2-3 lines:\n{text}"}
            ],
            "max_tokens": 150,
            "temperature": 0.5
        }

        response = requests.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            print("Gemini API Error:", response.text)
            return jsonify({
                "error": "Gemini API failed",
                "details": response.text
            }), 500

        # Parse summary
        result = response.json()
        summary = result.get("choices", [{}])[0].get("message", {}).get("content")

        if not summary:
            summary = result.get("responseText", "")

        return jsonify({"summary": summary.strip()})

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # ✅ Bind to 0.0.0.0 and use Render's PORT
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)