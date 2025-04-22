# GitHub Username Maker

A simple and fun web app that generates creative GitHub usernames using AI!

## Features

- 🔮 AI-powered username generation using OpenAI and DeepSeek APIs
- 🔁 Automatic fallback to local generator if APIs fail
- 📋 One-click copy to clipboard
- 💡 Input your real name, a funny or overrated name, and your favorite number or character

## How It Works

1. Enter your name, an overrated name, and your favorite character/number.
2. Click **Generate Username**.
3. The app will:
   - First try OpenAI's free proxy
   - Then try DeepSeek AI if the first fails
   - Finally use a local algorithm if both APIs fail
4. You get a creative GitHub username!

## Tech Stack

- HTML, CSS, JavaScript
- OpenAI (via free proxy)
- DeepSeek Chat API
- Local fallback logic

## Getting Started

To use this locally:

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/github-username-maker.git
   cd github-username-maker
