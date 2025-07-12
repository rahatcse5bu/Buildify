'use client';

import React from 'react';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function PropertiesPanel() {
  const { state, updateComponent, getCurrentScreen } = useAppBuilder();
  
  if (!state.selectedComponent) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Select a component to edit its properties
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentScreen = getCurrentScreen();
  const selectedComponent = findComponentById(currentScreen?.components || [], state.selectedComponent);

  if (!selectedComponent) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Component not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePropertyChange = (property: string, value: any) => {
    updateComponent(selectedComponent.id, { [property]: value });
  };

  const renderPropertyInput = (property: string, value: any, type: string = 'text') => {
    switch (type) {
      case 'color':
        return (
          <div className="space-y-2">
            <Label className="text-xs">{property}</Label>
            <Input
              type="color"
              value={value}
              onChange={(e) => handlePropertyChange(property, e.target.value)}
              className="h-8"
            />
          </div>
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Label className="text-xs">{property}</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => handlePropertyChange(property, parseInt(e.target.value))}
              className="h-8"
            />
          </div>
        );

      case 'select':
        const options = getSelectOptions(property, selectedComponent.type);
        return (
          <div className="space-y-2">
            <Label className="text-xs">{property}</Label>
            <Select value={value} onValueChange={(newValue) => handlePropertyChange(property, newValue)}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'boolean':
        return (
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePropertyChange(property, e.target.checked)}
                className="w-4 h-4"
              />
              {property}
            </Label>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label className="text-xs">{property}</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => handlePropertyChange(property, e.target.value)}
              className="h-8"
            />
          </div>
        );
    }
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">
              {selectedComponent.name} Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-3">
            {Object.entries(selectedComponent.props).map(([property, value]) => {
              const inputType = getInputType(property, selectedComponent.type);
              return (
                <div key={property}>
                  {renderPropertyInput(property, value, inputType)}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function findComponentById(components: any[], id: string): any {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getInputType(property: string, componentType: string): string {
  const colorProperties = ['color', 'backgroundColor', 'textColor', 'borderColor', 'primaryColor'];
  const numberProperties = ['fontSize', 'width', 'height', 'padding', 'margin', 'borderRadius', 'borderWidth', 'gap'];
  const booleanProperties = ['checked', 'enabled', 'controls', 'autoPlay', 'showBackButton', 'separator', 'highlightToday'];
  
  if (colorProperties.includes(property)) return 'color';
  if (numberProperties.includes(property)) return 'number';
  if (booleanProperties.includes(property)) return 'boolean';
  
  // Component-specific select properties
  if (property === 'fontWeight') return 'select';
  if (property === 'textAlign') return 'select';
  if (property === 'justifyContent') return 'select';
  if (property === 'alignItems') return 'select';
  if (property === 'type' && componentType === 'Input') return 'select';
  if (property === 'type' && componentType === 'Chart') return 'select';
  if (property === 'facing' && componentType === 'Camera') return 'select';
  
  return 'text';
}

function getSelectOptions(property: string, componentType: string) {
  switch (property) {
    case 'fontWeight':
      return [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' },
        { value: 'lighter', label: 'Lighter' }
      ];
    
    case 'textAlign':
      return [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ];
    
    case 'justifyContent':
      return [
        { value: 'flex-start', label: 'Start' },
        { value: 'center', label: 'Center' },
        { value: 'flex-end', label: 'End' },
        { value: 'space-between', label: 'Space Between' },
        { value: 'space-around', label: 'Space Around' }
      ];
    
    case 'alignItems':
      return [
        { value: 'flex-start', label: 'Start' },
        { value: 'center', label: 'Center' },
        { value: 'flex-end', label: 'End' },
        { value: 'stretch', label: 'Stretch' }
      ];
    
    case 'type':
      if (componentType === 'Input') {
        return [
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'password', label: 'Password' },
          { value: 'number', label: 'Number' }
        ];
      }
      if (componentType === 'Chart') {
        return [
          { value: 'bar', label: 'Bar Chart' },
          { value: 'line', label: 'Line Chart' },
          { value: 'pie', label: 'Pie Chart' }
        ];
      }
      break;
    
    case 'facing':
      return [
        { value: 'back', label: 'Back Camera' },
        { value: 'front', label: 'Front Camera' }
      ];
    
    default:
      return [];
  }
}
