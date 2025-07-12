'use client';

import React from 'react';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ComponentConfig } from '@/types';
import { X, Settings2 } from 'lucide-react';

function findComponentById(components: ComponentConfig[], id: string): ComponentConfig | null {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function PropertiesPanel() {
  const { state, updateComponent, dispatch } = useAppBuilder();
  
  if (!state.selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <Settings2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2">Properties</h3>
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const currentScreen = state.currentApp.screens.find(
    screen => screen.id === state.selectedScreen
  );
  
  const selectedComponent = currentScreen ? findComponentById(currentScreen.components, state.selectedComponent) : null;

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p>Component not found</p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property: string, value: string | number | boolean) => {
    updateComponent(state.selectedComponent!, { [property]: value });
  };

  const handleClose = () => {
    dispatch({ type: 'SELECT_COMPONENT', payload: null });
  };

  const renderPropertyInput = (key: string, value: unknown) => {
    const inputId = `prop-${key}`;

    if (typeof value === 'boolean') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId} className="text-sm font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id={inputId}
              type="checkbox"
              checked={value}
              onChange={(e) => handlePropertyChange(key, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">{value ? 'True' : 'False'}</span>
          </div>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId} className="text-sm font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Label>
          <Input
            id={inputId}
            type="number"
            value={value}
            onChange={(e) => handlePropertyChange(key, parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      );
    }

    if (key === 'backgroundColor' || key === 'color' || key === 'borderColor' || key === 'textColor') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId} className="text-sm font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          </Label>
          <div className="flex gap-2">
            <input
              id={inputId}
              type="color"
              value={value as string}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              type="text"
              value={value as string}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </div>
      );
    }

    if (key === 'textAlign') {
      const options = ['left', 'center', 'right', 'justify'];
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId} className="text-sm font-medium">
            Text Align
          </Label>
          <select
            id={inputId}
            value={value as string}
            onChange={(e) => handlePropertyChange(key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (key === 'fontWeight') {
      const weights = ['normal', 'bold', 'lighter', 'bolder'];
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={inputId} className="text-sm font-medium">
            Font Weight
          </Label>
          <select
            id={inputId}
            value={value as string}
            onChange={(e) => handlePropertyChange(key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {weights.map((weight) => (
              <option key={weight} value={weight}>
                {weight.charAt(0).toUpperCase() + weight.slice(1)}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Label>
          <div className="space-y-1">
            {value.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={typeof item === 'string' ? item : JSON.stringify(item)}
                  onChange={(e) => {
                    const newArray = [...value];
                    newArray[index] = e.target.value;
                    handlePropertyChange(key, newArray as never);
                  }}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newArray = value.filter((_, i) => i !== index);
                    handlePropertyChange(key, newArray as never);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newArray = [...value, ''];
                handlePropertyChange(key, newArray as never);
              }}
              className="w-full"
            >
              Add Item
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={inputId} className="text-sm font-medium">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
        </Label>
        <Input
          id={inputId}
          type="text"
          value={value as string}
          onChange={(e) => handlePropertyChange(key, e.target.value)}
          className="w-full"
        />
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Properties</h3>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Card className="mb-4">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Component Info</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-gray-500">Type</Label>
                <p className="text-sm font-medium">{selectedComponent.type}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">ID</Label>
                <p className="text-xs text-gray-600 font-mono">{selectedComponent.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Properties</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-4">
              {Object.entries(selectedComponent.props).map(([key, value]) =>
                renderPropertyInput(key, value)
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
