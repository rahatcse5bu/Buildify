'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentConfig } from '@/types';
import { useAppBuilder } from '@/contexts/AppBuilderContext';
import { ComponentRenderer } from './ComponentRenderer';
import { cn } from '@/lib/utils';
import { Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableComponentProps {
  component: ComponentConfig;
}

export function SortableComponent({ component }: SortableComponentProps) {
  const { state, removeComponent, dispatch } = useAppBuilder();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: component.id,
    data: {
      type: 'sortable-component',
      component
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = state.selectedComponent === component.id;

  const handleSelect = () => {
    dispatch({
      type: 'SELECT_COMPONENT',
      payload: component.id
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(component.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "relative group border-2 border-transparent rounded-lg transition-all",
        isSelected && "border-blue-500 bg-blue-50",
        isDragging && "opacity-50 z-50"
      )}
      onClick={handleSelect}
    >
      {/* Component Controls */}
      {isSelected && (
        <div className="absolute -top-8 right-0 flex gap-1 z-10">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open properties panel
            }}
          >
            <Settings className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Drag Handle */}
      <div
        {...listeners}
        className={cn(
          "absolute inset-0 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity",
          isDragging && "cursor-grabbing"
        )}
      />

      {/* Component Content */}
      <ComponentRenderer component={component} />
    </div>
  );
}
