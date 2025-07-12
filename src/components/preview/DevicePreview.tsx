'use client';

import React from 'react';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { ComponentRenderer } from '@/components/builder/ComponentRenderer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Smartphone, Tablet } from 'lucide-react';

export function DevicePreview() {
  const { state, dispatch } = useAppBuilder();
  const currentScreen = state.currentApp.screens.find(
    screen => screen.id === state.selectedScreen
  );

  const isAndroid = state.deviceType === 'android';

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Preview Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex gap-2">
            <Button
              variant={isAndroid ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch({ type: 'SET_DEVICE_TYPE', payload: 'android' })}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Android
            </Button>
            <Button
              variant={!isAndroid ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch({ type: 'SET_DEVICE_TYPE', payload: 'ios' })}
            >
              <Tablet className="w-4 h-4 mr-2" />
              iOS
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => dispatch({ type: 'TOGGLE_PREVIEW_MODE' })}
        >
          {state.isPreviewMode ? 'Exit Preview' : 'Enter Preview Mode'}
        </Button>
      </div>

      {/* Device Frame */}
      <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center">
        <div className={cn(
          "relative",
          isAndroid ? "android-frame" : "ios-frame"
        )}>
          {/* Device Outer Frame */}
          <div className={cn(
            "relative rounded-3xl p-2",
            isAndroid 
              ? "bg-gray-800 shadow-xl" 
              : "bg-gray-900 shadow-2xl"
          )}>
            {/* Device Screen */}
            <div className={cn(
              "relative bg-white overflow-hidden",
              isAndroid 
                ? "rounded-2xl w-64 h-[520px]" 
                : "rounded-3xl w-64 h-[520px]"
            )}>
              {/* Status Bar */}
              <div className={cn(
                "flex justify-between items-center px-4 py-1 text-xs",
                isAndroid 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-black text-white"
              )}>
                <div className="flex items-center gap-1">
                  <span>9:41</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                  </div>
                  <div className="w-6 h-3 border border-current rounded-sm">
                    <div className="w-4 h-1 bg-current rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto h-[480px]">
                {currentScreen ? (
                  <div className="p-4 space-y-2">
                    {currentScreen.components.map((component) => (
                      <ComponentRenderer
                        key={component.id}
                        component={component}
                        isPreview={state.isPreviewMode}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <p>No screen selected</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Indicator (iOS) */}
              {!isAndroid && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          {/* Device Controls (Android) */}
          {isAndroid && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border border-white rounded-sm"></div>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Info */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Device:</span>
            <span className="font-medium">
              {isAndroid ? 'Android Phone' : 'iPhone'}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Resolution:</span>
            <span className="font-medium">375 × 667</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Components:</span>
            <span className="font-medium">
              {currentScreen?.components.length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
