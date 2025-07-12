'use client';

import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { AppBuilderProvider, useAppBuilder } from '@/contexts/AppBuilderContext';
import { ComponentPalette } from '@/components/builder/ComponentPalette';
import { Canvas } from '@/components/builder/Canvas';
import { DevicePreview } from '@/components/preview/DevicePreview';
import { Toolbar } from '@/components/builder/Toolbar';
import { createComponentInstance } from '@/lib/componentLibrary';
import { ComponentConfig } from '@/types';

function AppBuilderContent() {
  const { state, addComponent, reorderComponents, getCurrentScreen } = useAppBuilder();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeComponent, setActiveComponent] = React.useState<ComponentConfig | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    if (active.data.current?.type === 'component') {
      setActiveComponent(active.data.current.componentConfig);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveComponent(null);
      return;
    }

    // Handle dropping component from palette to canvas
    if (active.data.current?.type === 'component' && over.id === 'canvas') {
      const componentConfig = active.data.current.componentConfig;
      const newComponent = createComponentInstance(componentConfig.type);
      addComponent(newComponent);
    }

    // Handle reordering components within canvas
    if (active.data.current?.type === 'sortable-component' && over.data.current?.type === 'sortable-component') {
      const currentScreen = getCurrentScreen();
      if (!currentScreen) return;

      const oldIndex = currentScreen.components.findIndex(comp => comp.id === active.id);
      const newIndex = currentScreen.components.findIndex(comp => comp.id === over.id);

      if (oldIndex !== newIndex) {
        const newComponents = arrayMove(currentScreen.components, oldIndex, newIndex);
        reorderComponents(newComponents);
      }
    }

    setActiveId(null);
    setActiveComponent(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Toolbar */}
        <Toolbar />
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Component Palette */}
          <ComponentPalette />
          
          {/* Canvas */}
          <Canvas />
          
          {/* Device Preview */}
          <DevicePreview />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeComponent && (
          <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-lg opacity-90">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{activeComponent.name}</span>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export function AppBuilder() {
  return (
    <AppBuilderProvider>
      <AppBuilderContent />
    </AppBuilderProvider>
  );
}
