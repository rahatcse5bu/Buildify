'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { SortableComponent } from './SortableComponent';
import { createComponentInstance } from '@/lib/componentLibrary';
import { cn } from '@/lib/utils';

export function Canvas() {
  const { state, addComponent, getCurrentScreen } = useAppBuilder();
  const currentScreen = getCurrentScreen();

  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas'
    }
  });

  const handleDrop = (event: any) => {
    const { active } = event;
    
    if (active.data.current?.type === 'component') {
      const componentConfig = active.data.current.componentConfig;
      const newComponent = createComponentInstance(componentConfig.type);
      addComponent(newComponent);
    }
  };

  if (!currentScreen) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No screen selected</p>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex-1 bg-gray-50 p-8 overflow-y-auto",
        isOver && "bg-blue-50"
      )}
    >
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px]">
        {/* Device Frame */}
        <div className="bg-gray-900 p-2">
          <div className="bg-white rounded-lg min-h-[580px] relative">
            {/* Screen Content */}
            <div className="p-4 h-full">
              {currentScreen.components.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <p className="text-lg mb-2">Drop components here</p>
                    <p className="text-sm">Drag components from the palette to build your app</p>
                  </div>
                </div>
              ) : (
                <SortableContext 
                  items={currentScreen.components.map(comp => comp.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {currentScreen.components.map((component) => (
                      <SortableComponent
                        key={component.id}
                        component={component}
                      />
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
