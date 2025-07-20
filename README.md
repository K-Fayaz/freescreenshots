# Social Media Screenshot Tool

A beautiful, production-ready web app for capturing and customizing screenshots of social media posts from X (Twitter) and Peerlist. Built with React, TypeScript, Tailwind CSS, and a Node.js/Express backend using Puppeteer for scraping.

---

## Features

- 📸 **Screenshot Tweets & Peerlist Posts:** Paste a Tweet, thread, profile, or Peerlist post URL to preview and screenshot.
- 🎨 **Customizable Previews:**
  - Light/Dark themes
  - Solid or gradient backgrounds
  - Adjustable padding
  - Multiple font choices
  - Logo selection (X, Twitter, Peerlist, or none)
  - Highlight color, watermark, and more
- 🖼️ **Export:** Download high-quality PNG images of the previewed post.
- ⚡ **Fast & Modern UI:** Built with React, Tailwind CSS, and Lucide icons.

---

## Demo

![screenshot demo](client/src/assets/avatar1.png)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd screenshoots
```

### 2. Install dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd ../client
npm install
```

### 3. Run the development servers
#### Backend (port 8081 by default)
```bash
cd server
npm run dev
```
#### Frontend (port 5173 by default)
```bash
cd ../client
npm run dev
```

- The frontend expects the backend to be running at `http://localhost:8081` (see `client/src/config.ts`).

---

## Usage

1. Open the frontend in your browser (usually [http://localhost:5173](http://localhost:5173)).
2. Click **New post** and paste a Tweet, thread, profile, or Peerlist post URL.
3. Customize the preview using the sidebar (theme, color, font, logo, etc.).
4. Click **Export** to download the screenshot as a PNG.

---

## Supported Platforms
- [X (Twitter)](https://x.com)
- [Peerlist](https://peerlist.io)

---

## API (Backend)

### `POST /screenshots?url=<post_url>`
- **Request:** JSON body not required. URL is passed as a query parameter.
- **Response:**
  - `status`: "success" or error message
  - `platform`: Detected platform (e.g., `x.com`, `peerlist.io`)
  - `data`: Extracted post details (varies by platform)

#### Example
```bash
curl -X POST "http://localhost:8081/screenshots?url=https://x.com/username/status/1234567890"
```

---

## Customization
- Edit `client/src/config.ts` to change the backend API URL.
- Tweak styles in `client/src/index.css` or `tailwind.config.js`.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React, html2canvas, html-to-image
- **Backend:** Node.js, Express, Puppeteer, Cheerio

---

## License

[MIT](LICENSE)

---

## Credits
- UI/UX: [@fayaz_kudremane](https://x.com/fayaz_kudremane/) 