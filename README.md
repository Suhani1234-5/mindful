# ✨ Mindful - AI-Powered Text Summarizer

A beautiful, modern web application that leverages cutting-edge AI to instantly summarize any text into concise, easy-to-understand summaries.

![Tech Stack](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5-4285F4?style=for-the-badge&logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Overview

Mindful is a full-stack application that combines an elegant, glassmorphic frontend with a robust Flask backend to deliver instant AI-powered text summarization. The application uses Google's Gemini 2.5 Flash Lite model to generate accurate, concise summaries of any input text.

## ✨ Features

### 🎨 Frontend
- **Modern Glassmorphic UI** - Beautiful glass-effect design with animated gradient backgrounds
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Animated Elements** - Smooth animations including pulsing orbs, hover effects, and fade-ins
- **Real-time Feedback** - Loading states, error handling, and instant results
- **Accessibility** - Semantic HTML and proper contrast ratios

### 🧠 Backend
- **AI-Powered** - Integrates with Google Gemini 2.5 Flash Lite API
- **RESTful API** - Clean Flask backend with proper CORS handling
- **Error Handling** - Comprehensive error handling and validation
- **Secure** - Environment-based API key management
- **Production Ready** - Deployed on Render with proper health checks

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with Hooks (useState)
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling
- **Deployed on**: Vercel

### Backend
- **Flask** - Lightweight Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **Requests** - HTTP library for API calls
- **Python-dotenv** - Environment variable management
- **Deployed on**: Render

### AI Model
- **Google Gemini 2.5 Flash Lite** - Fast, efficient AI model for text summarization

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API key

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Suhani1234-5/mindful.git
cd mindful

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory (if separate)
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors requests python-dotenv

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run the server
python app.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### Frontend Configuration

Update the API endpoint in `App.jsx`:

```javascript
const response = await fetch("https://your-backend-url.com/summarize", {
  // ... rest of the config
});
```

## 🎮 Usage

1. **Enter Text**: Type or paste any text into the input field
2. **Click Summarize**: Press the "Summarize Now" button
3. **Get Results**: Receive a concise 2-3 line summary instantly
4. **View Summary**: Read your AI-generated summary in the elegant card below

## 📡 API Endpoints

### POST `/summarize`
Generates a summary of the provided text.

**Request Body:**
```json
{
  "text": "Your long text here..."
}
```

**Response:**
```json
{
  "summary": "Concise 2-3 line summary..."
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Additional details (if available)"
}
```

### GET `/`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Mindful AI Summarizer Backend is running"
}
```

## 🎨 Design Features

- **Glassmorphism Effect** - Frosted glass aesthetic with backdrop blur
- **Animated Gradient Orbs** - Dynamic, pulsing background elements
- **Hover Interactions** - Smooth scale and glow effects on buttons
- **Grid Pattern Overlay** - Subtle tech-inspired background pattern
- **Gradient Text** - Multi-color gradient headings
- **Loading Animations** - Spinning loader during processing
- **Feature Badges** - Highlight key capabilities (Instant, AI-Powered, Private, Accurate)

## 🔒 Security Features

- **CORS Protection** - Configured for specific frontend origin
- **API Key Security** - Environment-based key management
- **Input Validation** - Server-side validation of all inputs
- **Error Sanitization** - Safe error messages without sensitive data

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel via GitHub integration or CLI
```

### Backend (Render)
- Connect your GitHub repository
- Set environment variables in Render dashboard
- Deploy with automatic builds on push

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👩‍💻 Author

**Suhani**
- GitHub: [@Suhani1234-5](https://github.com/Suhani1234-5)

## 🙏 Acknowledgments

- Google Gemini AI for the powerful summarization model
- React community for excellent documentation
- Tailwind CSS for the utility-first framework
- Vercel and Render for seamless deployment


**Live Demo**: [https://mindful-peach.vercel.app](https://mindful-peach.vercel.app)

