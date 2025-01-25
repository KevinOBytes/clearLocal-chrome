# Clear Local Storage - Chrome Extension 🧹

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue)](https://chrome.google.com/webstore/detail/[extension-id])
[![Tests](https://img.shields.io/badge/Tests-Jest-green)](https://github.com/KevinOBytes/clearlocal-chrome/tree/main/tests)

> A Chrome extension that helps you quickly clear various types of browser storage for the current tab. Super helpful for testing and debugging during development. Inspired by my constant need to clear local storage when working with GDPR compliance, consent management, and cookies.

<p align="center">
  <img src="utils/icon.svg" alt="Clear Local Storage Icon" width="128" height="128">
</p>

## ✨ Features

- 🔄 One-click clearing of all storage types
- 🖱️ Right-click menu options to selectively clear:
  - 📦 Local Storage
  - 🔒 Session Storage
  - 🍪 Cookies
  - 💾 Browser Cache
  - 🧹 All Storage Types

## 🚀 Installation

### From Chrome Web Store  `coming soon`
1. Visit our [Clear Local Storage extension page](https://chrome.google.com/webstore/detail/[extension-id]) on the Chrome Web Store
2. Click "Add to Chrome"
3. Click "Add extension" in the popup

### From Source
1. Clone this repository:
   ```bash
   git clone https://github.com/KevinOBytes/clearlocal-chrome.git
   cd clearlocal-chrome
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate the extension icons:
   ```bash
   npm run convert-icons
   ```
4. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top right
   - Click "Load unpacked" and select the extension directory

## 🛠️ Development

### Tech Stack
- ⚡ Manifest V3
- 🌐 Chrome Extension APIs
- 💻 JavaScript
- 🧪 Jest for testing
- 🎨 SVG to PNG conversion utility

### Making Changes
1. Edit the source files as needed
2. If you modify `utils/icon.svg`, run `npm run convert-icons`
3. Run tests to ensure nothing broke: `npm test`
4. Test in Chrome by reloading the extension

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
clearlocal-chrome/
├── icons/              # Generated extension icons
├── utils/
│   ├── icon.svg       # Source icon file
│   └── convert-icons.js# Icon conversion utility
├── tests/
│   ├── background.test.js # Test suite for background script
│   └── setup.js      # Test environment setup
├── background.js      # Extension background script
├── manifest.json      # Extension manifest
├── package.json       # Project dependencies
├── .gitignore        # Git ignore file
└── README.md         # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes and add tests for them
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some Feature'`)
6. Push to the branch (`git push origin feature/YourFeature`)
7. Open a Pull Request
8. Wait for approval and merge

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 📋 To Do

### Publish to Chrome Web Store

#### 1. Developer Registration
- [ ] Visit [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [ ] Pay registration fee ($5)
- [ ] Complete verification

#### 2. Build Production Version
```bash
npm run build
```
- [ ] Generate optimized icons
- [ ] Create submission zip file

#### 3. Store Assets
- [ ] Screenshots of extension in use
- [ ] Promotional tile images
- [ ] Detailed description
- [ ] Privacy policy

#### 4. Required Store Items
- [ ] Small tile (128x128)
- [ ] Large tile (440x280)
- [ ] Screenshots (1280x800 or 640x400)
- [ ] Detailed description
- [ ] Privacy policy

#### 5. Submit for Review
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click "New Item"
3. Upload zip file
4. Fill in store listing:
   - [ ] Description
   - [ ] Screenshots
   - [ ] Promotional images
   - [ ] Category (Productivity)
   - [ ] Language
5. Submit for review

---
<p align="center">
  Made with ❤️ by <a href="https://github.com/KevinOBytes">KevinOBytes</a>
</p>