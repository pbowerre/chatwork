# ChatWork 💬✨

ChatWork is a powerful, highly customizable web application for generating realistic mock chat screenshots for both iOS (iPhone) and Android platforms. Whether you're a designer, content creator, or developer needing mockup assets, ChatWork lets you craft the perfect conversation visually and export it in high quality.

## 🚀 Features

- **Multi-Platform Previews:** Seamlessly toggle between realistic iOS (iPhone) and Android device mockups.
- **Dynamic Chat Editor:** 
  - Add, edit, and rearrange messages easily.
  - Switch between sender/receiver roles.
  - Customize message read/delivered statuses.
- **Profile Customization:** Modify the chat profile name, avatar, and online status.
- **Beautiful UI & Animations:** Built with modern design principles, featuring smooth Framer Motion micro-animations, glassmorphism, and a sleek dark mode editor.
- **Customizable Backgrounds:** Choose between transparent, solid colors, stunning gradients, or custom hex codes for your screenshot background.
- **High-Quality Export:** Export your generated chat screenshot directly as a high-resolution PNG image with a single click.
- **Fully Responsive:** Carefully optimized layout that works flawlessly on desktop, tablet, and mobile browsers.

## 🛠️ Technology Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (with responsive mobile-first patterns)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Management:** Custom React Hooks
- **Exporting:** HTML to Image parsing utilities

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite) to see the app running!

## 📸 Usage Guide

1. **Set up the Profile:** Open the "Profile" accordion on the left sidebar to set the avatar and display name of the contact you are chatting with.
2. **Add Messages:** Open the "Conversation" accordion to build your chat. Type your message, choose the sender (Me vs Them), and hit "Add Message". You can drag to reorder them!
3. **Tweak the Settings:** Use the right sidebar to change the background style of your mockup or adjust device-specific status bar settings (like battery, Wi-Fi, and time).
4. **Choose Platform:** Use the toggle directly above the phone to switch between iPhone and Android views.
5. **Export:** Click the **"Export"** button in the top right corner to download your masterpiece as a PNG file.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the MIT License.
