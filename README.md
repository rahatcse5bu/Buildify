# Buildify - Android & iOS App Builder

A powerful drag-and-drop app builder for creating Android and iOS applications with a visual interface.

## 🚀 Features

- **Drag & Drop Interface**: Intuitive component palette with easy drag-and-drop functionality
- **Real-time Preview**: Live preview for both Android and iOS devices
- **Component Library**: 
  - Basic components (Text, Button, Image, Input)
  - Layout components (Container, Row, Column, List)
  - Form components (Checkbox, Switch)
  - Media components (Video, Audio, Camera)
  - Navigation components (NavigationBar, TabBar)
  - Advanced components (Chart, Calendar, Map)
- **Template System**: Pre-built templates for different app categories
- **Device Preview**: Switch between Android and iOS preview modes
- **Build & Download**: Simulate APK and IPA build process with download functionality
- **Properties Panel**: Edit component properties with real-time updates
- **Multi-Screen Support**: Create and manage multiple app screens

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Build Tool**: Next.js with Turbopack

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buildify
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Getting Started

1. **Choose a Template**: Click the "Templates" button to start with a pre-built template or continue with a blank project
2. **Add Components**: Drag components from the left palette to the canvas
3. **Edit Properties**: Select any component to edit its properties in the properties panel
4. **Preview**: Use the device preview on the right to see your app in Android or iOS style
5. **Build**: Click "Build APK" or "Build IPA" to simulate the build process

### Component Categories

- **Basic**: Text, Button, Image, Input
- **Layout**: Container, Row, Column, List
- **Form**: Checkbox, Switch
- **Media**: Video, Audio, Camera
- **Navigation**: NavigationBar, TabBar
- **Advanced**: Chart, Calendar, Map

### Templates Available

- **Social Media App**: Complete social feed with posts and user interactions
- **E-Commerce App**: Shopping application with product catalog
- **Fitness Tracker**: Health and fitness monitoring dashboard
- **News Reader**: News application with article listings

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── builder/           # App builder components
│   ├── preview/           # Device preview components
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and component library
├── templates/             # Pre-built app templates
└── types/                 # TypeScript type definitions
```

## 🎨 Customization

### Adding New Components

1. Define the component in `src/lib/componentLibrary.ts`
2. Add rendering logic in `src/components/builder/ComponentRenderer.tsx`
3. The component will automatically appear in the palette

### Creating Templates

1. Define template configuration in `src/templates/index.ts`
2. Include component hierarchy and styling
3. Templates will appear in the template gallery

## 🔧 Build Configuration

The app simulates the build process for both Android and iOS:

- **Android**: Generates `.apk` files
- **iOS**: Generates `.ipa` files
- **Configuration**: Includes app name, package name, version, and target platform

## 🚀 Deployment

To deploy the application:

```bash
npm run build
npm start
```

Or deploy to platforms like Vercel, Netlify, or any Node.js hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Icons by Lucide
- Drag and drop functionality by @dnd-kit
- Styling with Tailwind CSS

---

**Happy Building!** 🎉
