'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { componentLibrary, getComponentIcon } from '@/lib/componentLibrary';
import { ComponentConfig } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DraggableComponentProps {
  component: ComponentConfig;
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: 'component',
      componentConfig: component
    }
  });

  const IconComponent = getComponentIcon(component.icon);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 transition-colors",
        isDragging && "opacity-50 cursor-grabbing"
      )}
    >
      <IconComponent className="w-6 h-6 text-gray-600" />
      <span className="text-xs text-center text-gray-700 font-medium">
        {component.name}
      </span>
    </div>
  );
}

export function ComponentPalette() {
  const categories = Array.from(new Set(componentLibrary.map(comp => comp.category)));

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
        
        {categories.map(category => {
          const categoryComponents = componentLibrary.filter(comp => comp.category === category);
          
          return (
            <Card key={category} className="mb-4">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-medium capitalize text-gray-700">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {categoryComponents.map(component => (
                    <DraggableComponent
                      key={component.id}
                      component={component}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
