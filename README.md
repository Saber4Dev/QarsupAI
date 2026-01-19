# Qarsup AI

AI-powered content creation platform for modern teams. Create high-quality content for your blog, social media, and website with artificial intelligence.

## Features

- 🤖 **AI Content Generation** - Create content quickly with AI assistance
- 📝 **Multiple Content Types** - Blog posts, social media content, and more
- 🎨 **User-Friendly Interface** - Intuitive design for seamless content creation
- 📊 **Dashboard** - Track your content and usage
- 💳 **Flexible Pricing** - Choose the plan that fits your needs

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Qarsup-AI
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/        # Next.js app router pages
│   ├── components/ # React components
│   └── lib/        # Utility functions
└── package.json
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy

## Support

For support, email support@qarsup-ai.com or visit our help center.

## License

All rights reserved.
