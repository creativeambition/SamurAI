# SamurAI

SamurAI is an AI-powered chatbot built with Next.js, designed to provide intelligent responses to user queries. It integrates with the hugging face inference API to fetch real-time responses and enhance user interactions.

## Features

- **AI-Powered Responses**: Utilizes an hugging face inference API to generate accurate and contextual replies.
- **Next.js Framework**: Built with Next.js for optimal performance and SEO benefits.
- **Fast and Scalable**: Efficient architecture for handling multiple user interactions.
- **Interactive UI**: Responsive and user-friendly chatbot interface.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Use NVM to manage versions)
- [Yarn](https://yarnpkg.com/) or npm

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/creativeambition/SamurAI.git
   cd samurai
   ```
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
3. Create a `.env.local` file and configure the token and models:
   ```env
   HF_TOKEN=your_api_key_here
   HF_MODEL=inference_model_here
   ```
4. Run the development server:
   ```sh
   yarn dev
   # or
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Technologies Used

- **Next.js** - React framework for SSR and static generation.
- **Tailwind CSS** - For styling and responsive design.
- **Hugging Face Inference API** - Utilized for AI model inference and chatbot responses.

## Contribution

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss your ideas.

---

Developed by [Creative Ambition](https://github.com/creativeambition).
