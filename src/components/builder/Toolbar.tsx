'use client';

import React from 'react';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Square, 
  Download, 
  Save, 
  Folder, 
  Settings,
  Smartphone,
  Monitor
} from 'lucide-react';

export function Toolbar() {
  const { state, dispatch } = useAppBuilder();

  const handleBuild = async (platform: 'android' | 'ios') => {
    // Simulate build process
    const buildConfig = {
      appName: state.currentApp.name,
      packageName: `com.buildify.${state.currentApp.name.toLowerCase().replace(/\s+/g, '')}`,
      version: '1.0.0',
      targetPlatform: platform,
      outputFormat: platform === 'android' ? 'apk' as const : 'ipa' as const
    };

    // In a real app, this would trigger the actual build process
    console.log('Building app:', buildConfig);
    
    // Simulate download
    const fileName = `${buildConfig.appName}.${buildConfig.outputFormat}`;
    const blob = new Blob(['Mock build file'], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`${platform.toUpperCase()} build completed! Download started.`);
  };

  const handleSave = () => {
    // Simulate saving the project
    const projectData = JSON.stringify(state.currentApp, null, 2);
    console.log('Saving project:', projectData);
    alert('Project saved successfully!');
  };

  const handleLoad = () => {
    // Simulate loading a project
    alert('Load project functionality coming soon!');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left Section - Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Buildify</h1>
          <div className="w-px h-6 bg-gray-300"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            value={state.currentApp.name}
            onChange={(e) => {
              // Update app name
              dispatch({
                type: 'SET_CURRENT_APP',
                payload: {
                  ...state.currentApp,
                  name: e.target.value
                }
              });
            }}
            className="w-48 h-8"
            placeholder="App name"
          />
        </div>
      </div>

      {/* Center Section - View Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant={state.deviceType === 'android' ? 'default' : 'outline'}
          size="sm"
          onClick={() => dispatch({ type: 'SET_DEVICE_TYPE', payload: 'android' })}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Android
        </Button>
        
        <Button
          variant={state.deviceType === 'ios' ? 'default' : 'outline'}
          size="sm"
          onClick={() => dispatch({ type: 'SET_DEVICE_TYPE', payload: 'ios' })}
        >
          <Monitor className="w-4 h-4 mr-2" />
          iOS
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <Button
          variant={state.isPreviewMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => dispatch({ type: 'TOGGLE_PREVIEW_MODE' })}
        >
          {state.isPreviewMode ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Stop Preview
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Preview
            </>
          )}
        </Button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleLoad}>
          <Folder className="w-4 h-4 mr-2" />
          Load
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => handleBuild('android')}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Build APK
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => handleBuild('ios')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Build IPA
        </Button>
        
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
