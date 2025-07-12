// Component types for the app builder
export interface ComponentConfig {
  id: string;
  type: string;
  name: string;
  icon: string;
  category: 'basic' | 'layout' | 'form' | 'media' | 'navigation' | 'advanced';
  props: Record<string, any>;
  children?: ComponentConfig[];
}

// Device types for preview
export type DeviceType = 'android' | 'ios';

// App screen configuration
export interface AppScreen {
  id: string;
  name: string;
  components: ComponentConfig[];
}

// App configuration
export interface AppConfig {
  id: string;
  name: string;
  description?: string;
  screens: AppScreen[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

// Template configuration
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  config: AppConfig;
}

// Build configuration
export interface BuildConfig {
  appName: string;
  packageName: string;
  version: string;
  targetPlatform: DeviceType;
  outputFormat: 'apk' | 'ipa';
}

// Drag and drop types
export interface DragItem {
  id: string;
  type: string;
  componentConfig: ComponentConfig;
}

export interface DropResult {
  draggedId: string;
  targetId?: string;
  position: 'before' | 'after' | 'inside';
}
