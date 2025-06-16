# i18n Demo - Weglot Visual Editor Integration

This demo showcases the power of Weglot's visual editor for in-context translation editing.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Testing Weglot Visual Editor

### Method 1: Live Translation Switching
1. Go to the [Weglot Demo page](http://localhost:3000/weglot)
2. Use the language switcher in the top-right corner
3. Watch as the content automatically translates in real-time

### Method 2: Visual Editor Mode
1. Navigate to: `http://localhost:3000/weglot?weglot_mode=translate`
2. This activates Weglot's actual visual editor
3. Click on any text element to edit translations directly
4. See changes applied instantly on the live page

### Method 3: Demo Simulation
1. Click the "Launch Visual Editor Demo" button on the Weglot page
2. This simulates the visual editor experience
3. Click on the highlighted content areas to see the translation interface

## 🔑 API Configuration

The demo uses a real Weglot API key configured in `.env.local`:
```
NEXT_PUBLIC_WEGLOT_API_KEY=wg_ee88fe9620369bb6fc8ecdabbcc819301
```

## 🌍 Supported Languages

- English (original)
- French (fr)
- Spanish (es)
- German (de)
- Italian (it)

## 📋 Features Demonstrated

### ✅ Weglot Visual Editor
- **In-context editing**: Click any text to translate directly on the page
- **Real-time preview**: See translations applied immediately
- **Language switching**: Seamless switching between languages
- **Auto-detection**: Automatic content detection and translation
- **SEO-friendly**: Translated URLs for better search visibility

### 🚧 Coming Soon
- Crowdin in-context editor integration
- Lokalise live edit functionality

## 🎯 Key Benefits Showcased

1. **Zero Code Changes**: Weglot works without modifying existing code
2. **Visual Context**: Translators see exactly how text appears on the live site
3. **Instant Updates**: Changes are applied immediately
4. **Team Collaboration**: Multiple translators can work simultaneously
5. **Quality Assurance**: Visual editor helps spot layout issues

## 🔧 Technical Implementation

The integration uses:
- Weglot JavaScript SDK loaded dynamically
- React hooks for state management
- Environment variables for API key configuration
- Custom language switcher component

## 📖 Usage Instructions

1. **For Translators:**
   - Add `?weglot_mode=translate` to any URL
   - Click on text elements to edit translations
   - Use the visual interface to see context

2. **For Developers:**
   - API key is configured in environment variables
   - Weglot script loads automatically on page load
   - Language switcher component can be reused

3. **For Project Managers:**
   - Monitor translation progress in real-time
   - Review translations in actual page context
   - Approve changes directly on the live site

## 🎬 Demo Scenarios

Try these scenarios to see Weglot in action:

1. **E-commerce Product Pages**: Navigate to `/products` and switch languages
2. **Dynamic Content**: See how product descriptions and prices are handled
3. **Navigation Elements**: Watch menus and buttons translate automatically
4. **Form Elements**: Test how form labels and placeholders are translated

## 🔍 What to Look For

- **Automatic Detection**: Notice how Weglot finds all translatable content
- **Layout Preservation**: Text length changes don't break the design
- **Speed**: Translations load instantly without page refresh
- **SEO URLs**: Language-specific URLs are generated automatically

This demo provides a comprehensive look at how Weglot's visual editor can streamline the translation workflow while maintaining the quality and context that translators need.
