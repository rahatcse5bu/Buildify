'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ComponentConfig, AppConfig, AppScreen, DeviceType } from '@/types';

interface AppBuilderState {
  currentApp: AppConfig;
  selectedScreen: string;
  selectedComponent: string | null;
  deviceType: DeviceType;
  isPreviewMode: boolean;
}

type AppBuilderAction =
  | { type: 'SET_CURRENT_APP'; payload: AppConfig }
  | { type: 'SELECT_SCREEN'; payload: string }
  | { type: 'SELECT_COMPONENT'; payload: string | null }
  | { type: 'SET_DEVICE_TYPE'; payload: DeviceType }
  | { type: 'TOGGLE_PREVIEW_MODE' }
  | { type: 'ADD_COMPONENT'; payload: { screenId: string; component: ComponentConfig; index?: number } }
  | { type: 'UPDATE_COMPONENT'; payload: { componentId: string; props: Record<string, any> } }
  | { type: 'REMOVE_COMPONENT'; payload: { componentId: string } }
  | { type: 'REORDER_COMPONENTS'; payload: { screenId: string; components: ComponentConfig[] } };

const initialState: AppBuilderState = {
  currentApp: {
    id: 'default-app',
    name: 'My App',
    screens: [
      {
        id: 'home-screen',
        name: 'Home',
        components: []
      }
    ],
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    }
  },
  selectedScreen: 'home-screen',
  selectedComponent: null,
  deviceType: 'android',
  isPreviewMode: false
};

function appBuilderReducer(state: AppBuilderState, action: AppBuilderAction): AppBuilderState {
  switch (action.type) {
    case 'SET_CURRENT_APP':
      return {
        ...state,
        currentApp: action.payload,
        selectedScreen: action.payload.screens[0]?.id || ''
      };

    case 'SELECT_SCREEN':
      return {
        ...state,
        selectedScreen: action.payload,
        selectedComponent: null
      };

    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponent: action.payload
      };

    case 'SET_DEVICE_TYPE':
      return {
        ...state,
        deviceType: action.payload
      };

    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        isPreviewMode: !state.isPreviewMode
      };

    case 'ADD_COMPONENT':
      return {
        ...state,
        currentApp: {
          ...state.currentApp,
          screens: state.currentApp.screens.map(screen =>
            screen.id === action.payload.screenId
              ? {
                  ...screen,
                  components: action.payload.index !== undefined
                    ? [
                        ...screen.components.slice(0, action.payload.index),
                        action.payload.component,
                        ...screen.components.slice(action.payload.index)
                      ]
                    : [...screen.components, action.payload.component]
                }
              : screen
          )
        }
      };

    case 'UPDATE_COMPONENT':
      return {
        ...state,
        currentApp: {
          ...state.currentApp,
          screens: state.currentApp.screens.map(screen => ({
            ...screen,
            components: updateComponentRecursively(screen.components, action.payload.componentId, action.payload.props)
          }))
        }
      };

    case 'REMOVE_COMPONENT':
      return {
        ...state,
        currentApp: {
          ...state.currentApp,
          screens: state.currentApp.screens.map(screen => ({
            ...screen,
            components: removeComponentRecursively(screen.components, action.payload.componentId)
          }))
        },
        selectedComponent: state.selectedComponent === action.payload.componentId ? null : state.selectedComponent
      };

    case 'REORDER_COMPONENTS':
      return {
        ...state,
        currentApp: {
          ...state.currentApp,
          screens: state.currentApp.screens.map(screen =>
            screen.id === action.payload.screenId
              ? { ...screen, components: action.payload.components }
              : screen
          )
        }
      };

    default:
      return state;
  }
}

function updateComponentRecursively(
  components: ComponentConfig[],
  componentId: string,
  props: Record<string, any>
): ComponentConfig[] {
  return components.map(component => {
    if (component.id === componentId) {
      return { ...component, props: { ...component.props, ...props } };
    }
    if (component.children) {
      return {
        ...component,
        children: updateComponentRecursively(component.children, componentId, props)
      };
    }
    return component;
  });
}

function removeComponentRecursively(
  components: ComponentConfig[],
  componentId: string
): ComponentConfig[] {
  return components
    .filter(component => component.id !== componentId)
    .map(component => ({
      ...component,
      children: component.children
        ? removeComponentRecursively(component.children, componentId)
        : undefined
    }));
}

interface AppBuilderContextType {
  state: AppBuilderState;
  dispatch: React.Dispatch<AppBuilderAction>;
  getCurrentScreen: () => AppScreen | undefined;
  addComponent: (component: ComponentConfig, index?: number) => void;
  updateComponent: (componentId: string, props: Record<string, any>) => void;
  removeComponent: (componentId: string) => void;
  reorderComponents: (components: ComponentConfig[]) => void;
}

const AppBuilderContext = createContext<AppBuilderContextType | undefined>(undefined);

export function AppBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appBuilderReducer, initialState);

  const getCurrentScreen = () => {
    return state.currentApp.screens.find(screen => screen.id === state.selectedScreen);
  };

  const addComponent = (component: ComponentConfig, index?: number) => {
    dispatch({
      type: 'ADD_COMPONENT',
      payload: { screenId: state.selectedScreen, component, index }
    });
  };

  const updateComponent = (componentId: string, props: Record<string, any>) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: { componentId, props }
    });
  };

  const removeComponent = (componentId: string) => {
    dispatch({
      type: 'REMOVE_COMPONENT',
      payload: { componentId }
    });
  };

  const reorderComponents = (components: ComponentConfig[]) => {
    dispatch({
      type: 'REORDER_COMPONENTS',
      payload: { screenId: state.selectedScreen, components }
    });
  };

  return (
    <AppBuilderContext.Provider
      value={{
        state,
        dispatch,
        getCurrentScreen,
        addComponent,
        updateComponent,
        removeComponent,
        reorderComponents
      }}
    >
      {children}
    </AppBuilderContext.Provider>
  );
}

export function useAppBuilder() {
  const context = useContext(AppBuilderContext);
  if (context === undefined) {
    throw new Error('useAppBuilder must be used within an AppBuilderProvider');
  }
  return context;
}
