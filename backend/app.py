from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # to allow React frontend access

# Set your OpenAI API key
openai.api_key = "YOUR_OPENAI_API_KEY"  

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Text is required"}), 400

    try:
        # Use GPT model for summarization
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Summarize this in 2-3 lines:\n{text}"}
            ],
            max_tokens=100,
            temperature=0.5
        )

        summary = response.choices[0].message['content'].strip()
        return jsonify({"summary": summary})

    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to summarize"}), 500

if __name__ == "__main__":
    app.run(debug=True)
