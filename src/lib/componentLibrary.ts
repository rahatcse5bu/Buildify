import { ComponentConfig } from '@/types';
import { 
  Type, 
  Square, 
  Image, 
  MousePointer, 
  List, 
  AlignLeft,
  Layout,
  Grid,
  Camera,
  Video,
  Music,
  Navigation,
  Menu,
  BarChart3,
  Calendar,
  MapPin,
  Settings
} from 'lucide-react';

export const componentLibrary: ComponentConfig[] = [
  // Basic Components
  {
    id: 'text',
    type: 'Text',
    name: 'Text',
    icon: 'Type',
    category: 'basic',
    props: {
      text: 'Sample Text',
      fontSize: 16,
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left'
    }
  },
  {
    id: 'button',
    type: 'Button',
    name: 'Button',
    icon: 'MousePointer',
    category: 'basic',
    props: {
      text: 'Click Me',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderRadius: 8,
      padding: 12,
      fontSize: 16
    }
  },
  {
    id: 'image',
    type: 'Image',
    name: 'Image',
    icon: 'Image',
    category: 'media',
    props: {
      src: '/placeholder-image.jpg',
      alt: 'Placeholder',
      width: 200,
      height: 200,
      borderRadius: 0
    }
  },
  {
    id: 'input',
    type: 'Input',
    name: 'Text Input',
    icon: 'AlignLeft',
    category: 'form',
    props: {
      placeholder: 'Enter text...',
      type: 'text',
      borderColor: '#d1d5db',
      backgroundColor: '#ffffff',
      padding: 12,
      borderRadius: 8
    }
  },

  // Layout Components
  {
    id: 'container',
    type: 'Container',
    name: 'Container',
    icon: 'Square',
    category: 'layout',
    props: {
      backgroundColor: '#f9fafb',
      padding: 16,
      margin: 8,
      borderRadius: 8,
      borderColor: '#e5e7eb',
      borderWidth: 1
    },
    children: []
  },
  {
    id: 'row',
    type: 'Row',
    name: 'Row Layout',
    icon: 'Layout',
    category: 'layout',
    props: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
      padding: 8
    },
    children: []
  },
  {
    id: 'column',
    type: 'Column',
    name: 'Column Layout',
    icon: 'Grid',
    category: 'layout',
    props: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 8,
      padding: 8
    },
    children: []
  },
  {
    id: 'list',
    type: 'List',
    name: 'List View',
    icon: 'List',
    category: 'layout',
    props: {
      items: ['Item 1', 'Item 2', 'Item 3'],
      itemHeight: 60,
      separator: true,
      padding: 8
    }
  },

  // Form Components
  {
    id: 'checkbox',
    type: 'Checkbox',
    name: 'Checkbox',
    icon: 'Square',
    category: 'form',
    props: {
      label: 'Check this option',
      checked: false,
      color: '#3b82f6'
    }
  },
  {
    id: 'switch',
    type: 'Switch',
    name: 'Switch',
    icon: 'Settings',
    category: 'form',
    props: {
      label: 'Enable feature',
      enabled: false,
      color: '#3b82f6'
    }
  },

  // Media Components
  {
    id: 'video',
    type: 'Video',
    name: 'Video Player',
    icon: 'Video',
    category: 'media',
    props: {
      src: '/sample-video.mp4',
      poster: '/video-thumbnail.jpg',
      controls: true,
      autoPlay: false,
      width: 300,
      height: 200
    }
  },
  {
    id: 'audio',
    type: 'Audio',
    name: 'Audio Player',
    icon: 'Music',
    category: 'media',
    props: {
      src: '/sample-audio.mp3',
      controls: true,
      autoPlay: false
    }
  },
  {
    id: 'camera',
    type: 'Camera',
    name: 'Camera View',
    icon: 'Camera',
    category: 'media',
    props: {
      facing: 'back',
      width: 300,
      height: 200,
      borderRadius: 8
    }
  },

  // Navigation Components
  {
    id: 'navbar',
    type: 'NavigationBar',
    name: 'Navigation Bar',
    icon: 'Navigation',
    category: 'navigation',
    props: {
      title: 'App Title',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      showBackButton: false,
      height: 56
    }
  },
  {
    id: 'tabbar',
    type: 'TabBar',
    name: 'Tab Bar',
    icon: 'Menu',
    category: 'navigation',
    props: {
      tabs: [
        { id: 'home', title: 'Home', icon: 'home' },
        { id: 'search', title: 'Search', icon: 'search' },
        { id: 'profile', title: 'Profile', icon: 'user' }
      ],
      activeTab: 'home',
      backgroundColor: '#ffffff',
      activeColor: '#3b82f6',
      inactiveColor: '#6b7280'
    }
  },

  // Advanced Components
  {
    id: 'chart',
    type: 'Chart',
    name: 'Chart',
    icon: 'BarChart3',
    category: 'advanced',
    props: {
      type: 'bar',
      data: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 25 },
        { label: 'Apr', value: 60 }
      ],
      width: 300,
      height: 200,
      primaryColor: '#3b82f6'
    }
  },
  {
    id: 'calendar',
    type: 'Calendar',
    name: 'Calendar',
    icon: 'Calendar',
    category: 'advanced',
    props: {
      selectedDate: new Date().toISOString().split('T')[0],
      highlightToday: true,
      primaryColor: '#3b82f6'
    }
  },
  {
    id: 'map',
    type: 'Map',
    name: 'Map View',
    icon: 'MapPin',
    category: 'advanced',
    props: {
      latitude: 40.7128,
      longitude: -74.0060,
      zoom: 12,
      width: 300,
      height: 200,
      showMarkers: true
    }
  }
];

export function getComponentIcon(iconName: string) {
  const icons: Record<string, any> = {
    Type,
    Square,
    Image,
    MousePointer,
    List,
    AlignLeft,
    Layout,
    Grid,
    Camera,
    Video,
    Music,
    Navigation,
    Menu,
    BarChart3,
    Calendar,
    MapPin,
    Settings
  };
  
  return icons[iconName] || Square;
}

export function createComponentInstance(componentType: string): ComponentConfig {
  const baseComponent = componentLibrary.find(comp => comp.type === componentType);
  if (!baseComponent) {
    throw new Error(`Component type ${componentType} not found`);
  }

  return {
    ...baseComponent,
    id: `${componentType.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    children: baseComponent.children ? [] : undefined
  };
}
