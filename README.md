# Clear Local Storage - Chrome Extension

A Chrome extension that helps you quickly clear various types of browser storage for the current tab.

## Features

- One-click clearing of all storage types
- Right-click menu options to selectively clear:
  - Local Storage
  - Session Storage
  - Cookies
  - Browser Cache
  - All Storage Types

## Installation & Testing

### Development Setup
1. Install Node.js if you haven't already (download from nodejs.org)
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/clearlocal-chrome.git
   cd clearlocal-chrome
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate the extension icons:
   ```bash
   npm run convert-icons
   ```

### Loading the Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right corner
3. Click "Load unpacked" and select the extension directory
4. The extension icon should appear in your Chrome toolbar

### Running Tests
The extension includes a comprehensive test suite to ensure functionality:

1. Run all tests:
   ```bash
   npm test
   ```
2. Run tests in watch mode (for development):
   ```bash
   npm run test:watch
   ```

The test suite covers:
- Local Storage clearing
- Session Storage clearing
- Cookie management
- Error handling
- Edge cases

### Testing the Extension Manually
1. After loading the extension, you should see the extension icon in your toolbar
2. To test basic functionality:
   - Visit any website (e.g., github.com)
   - Click the extension icon to clear all storage
   - Right-click the icon to see individual clearing options
3. To verify it's working:
   - Open Chrome DevTools (F12 or Right-click > Inspect)
   - Go to the "Application" tab
   - Check the Storage section (Local Storage, Session Storage, Cookies)
   - Use the extension and observe the storage being cleared
4. To test changes to the code:
   - Make your changes
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension's card
   - Test the functionality again

## Project Structure

```
clearlocal-chrome/
├── icons/              # Generated extension icons (after running convert-icons)
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

## Development

The extension is built using:
- Manifest V3
- Chrome Extension APIs
- JavaScript
- Jest for testing

### Making Changes
1. Edit the source files as needed
2. If you modify `utils/icon.svg`, run `npm run convert-icons` again
3. Run tests to ensure nothing broke: `npm test`
4. Reload the extension in Chrome to see your changes
5. For JavaScript changes (`background.js`), just reload the extension
6. For manifest changes, reload the extension

### Common Issues
- If the extension icon doesn't appear, ensure the PNGs were generated correctly
- If storage isn't clearing, check the console in DevTools for errors
- If right-click menu doesn't appear, reload the extension
- If tests are failing, ensure all dependencies are installed and test environment is set up correctly

## Permissions

This extension requires the following permissions:
- `activeTab`: To interact with the current tab
- `storage`: To clear localStorage and sessionStorage
- `cookies`: To clear cookies
- `contextMenus`: To create the right-click menu options
- Access to all URLs: To function on any website

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes and add tests for them
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## Troubleshooting

If you encounter issues:
1. Check the Console in Chrome DevTools for errors
2. Ensure all permissions are granted to the extension
3. Try removing and re-adding the extension
4. Verify that all required files are present
5. Make sure the icons were generated correctly
6. Run tests to check for any obvious issues: `npm test`
7. Check test output for specific failures 