# 🦷 Smile Please - AI Dental Care Assistant

An AI-powered dental care recommendation system that helps customers find the perfect toothbrush and toothpaste based on their specific needs.

![Smile Please](https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800)

## ✨ Features

### For Customers
- **AI-Powered Chat Interface** - Natural conversation to understand dental needs
- **Personalized Recommendations** - Products matched to your specific concerns
- **Smart Profiling** - Analysis of sensitivity, gum health, whitening needs, and more
- **Doctor-Approved Products** - All recommendations reviewed by dental professionals

### For Doctors/Specialists
- **Easy Configuration Dashboard** - No coding required
- **Question Management** - Add, edit, or remove assessment questions
- **Product Catalog** - Manage toothpaste and toothbrush options
- **Visual Rule Builder** - Create recommendation rules with simple dropdowns
- **Doctor Scoring** - Rate products based on professional assessment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18
- **Styling**: Tailwind CSS + Framer Motion
- **AI**: Groq (Llama 3.3 70B) - FREE
- **Database**: Supabase (PostgreSQL) - FREE
- **Hosting**: Vercel - FREE

**Total Cost: $0/month** 🎉

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Groq API Key (free at https://console.groq.com)
- Supabase Account (free at https://supabase.com)

### Installation

1. **Clone the repository**
   ```bash
   cd smile-please
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Groq AI Configuration
   GROQ_API_KEY=your_groq_api_key_here

   # Supabase Configuration (optional for MVP)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Customer Chat: http://localhost:3000
   - Doctor Admin: http://localhost:3000/admin

## 📁 Project Structure

```
smile-please/
├── app/
│   ├── page.tsx          # Customer chat interface
│   ├── admin/
│   │   └── page.tsx      # Doctor's admin panel
│   ├── api/
│   │   └── chat/
│   │       └── route.ts  # AI chat API endpoint
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ChatInterface.tsx     # Main chat component
│   ├── ChatMessage.tsx       # Message bubbles
│   ├── RecommendationCard.tsx # Product cards
│   └── ProgressBar.tsx       # Question progress
├── lib/
│   ├── data.ts           # Sample data (questions, products, rules)
│   ├── store.ts          # Zustand state management
│   └── utils.ts          # Utility functions
└── ...config files
```

## 🎯 How It Works

### Customer Flow
1. Customer opens the chat interface
2. AI assistant asks a series of categorized questions:
   - Tooth Sensitivity
   - Gum Health
   - Whitening Preferences
   - Brushing Habits
   - Special Concerns
3. Based on answers, a dental profile is created
4. The system matches the profile against doctor-configured rules
5. AI generates personalized advice using Groq
6. Top product recommendations are displayed

### Doctor Configuration
1. **Questions**: Add/edit assessment questions with scoring options
2. **Products**: Manage product catalog with features and doctor scores
3. **Rules**: Create "IF-THEN" rules for recommendations
   - Example: IF sensitivity > 8 THEN recommend Sensodyne + Soft Brush

## 🔮 Future Enhancements

- [ ] Supabase database integration for persistent storage
- [ ] User accounts and saved recommendations
- [ ] Multi-language support
- [ ] Product purchase links
- [ ] Analytics dashboard
- [ ] Email/WhatsApp sharing

## 📄 License

MIT License - Feel free to use for your dental practice!

## 🙏 Support

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for better dental health

