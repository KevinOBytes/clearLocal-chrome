# Clear Local Storage - Chrome Extension

A Chrome extension that helps you quickly clear various types of browser storage for the current tab. Super helpful for testing and debugging during development. Inspired by my constant need to clear local storage when working with GDPR compliance, consent management, and cookies.

## Features

- One-click clearing of all storage types
- Right-click menu options to selectively clear:
  - Local Storage
  - Session Storage
  - Cookies
  - Browser Cache
  - All Storage Types

## Installation

### From Chrome Web Store  **coming soon**
1. Visit our [Clear Local Storage extension page](https://chrome.google.com/webstore/detail/[extension-id]) on the Chrome Web Store.
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

## Development

The extension is built using:
- Manifest V3
- Chrome Extension APIs
- JavaScript
- Jest for testing
- Includes utility to convert SVG icon to needed PNG sizes

### Making Changes
1. Edit the source files as needed
2. If you modify `utils/icon.svg`, run `npm run convert-icons`
3. Run tests to ensure nothing broke: `npm test`
4. Test in Chrome by reloading the extension

### Running Tests
1. Run all tests:
   ```bash
   npm test
   ```
2. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```

## Project Structure

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes and add tests for them
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some Feature'`)
6. Push to the branch (`git push origin feature/YourFeature`)
7. Open a Pull Request
8. Wait for approval and merge

## License

MIT License - see [LICENSE](LICENSE) for details 

## To Do

### Publish to Chrome Web Store

1. Register as a Chrome Web Store developer:
   - Visit [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay registration fee ($5)
   - Complete verification

2. Create a production build:
   ```bash
   npm run build
   ```

   This will:
   - Generate optimized icons
   - Create a zip file for submission

3. Create store assets:
   - TODO: Screenshots extension in use
   - TODO: Promotional tile images
   - TODO: Detailed description
   - TODO: Privacy policy

4. Required store listing items:
   - TODO: Small tile (128x128)
   - TODO: Large tile (440x280)
   - TODO: At least 1 screenshot (1280x800 or 640x400)
   - TODO: Detailed description
   - TODO: Privacy policy

5. Submit in Chrome Web Store [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

6. Click "New Item"

7. Upload the generated zip file

8. Fill in store listing information:
   - Detailed description
   - Screenshots
   - Promotional images
   - Category (Productivity)
   - Language

9. Submit for review