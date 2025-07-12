'use client';

import React from 'react';
import { ComponentConfig } from '@/types';
import { cn } from '@/lib/utils';

interface ComponentRendererProps {
  component: ComponentConfig;
  isPreview?: boolean;
}

export function ComponentRenderer({ component, isPreview = false }: ComponentRendererProps) {
  const { type, props } = component;

  switch (type) {
    case 'Text':
      return (
        <div
          className="p-2"
          style={{
            fontSize: props.fontSize,
            color: props.color,
            fontWeight: props.fontWeight,
            textAlign: props.textAlign
          }}
        >
          {props.text}
        </div>
      );

    case 'Button':
      return (
        <button
          className="inline-block cursor-pointer"
          style={{
            backgroundColor: props.backgroundColor,
            color: props.textColor,
            borderRadius: props.borderRadius,
            padding: props.padding,
            fontSize: props.fontSize,
            border: 'none'
          }}
          disabled={!isPreview}
        >
          {props.text}
        </button>
      );

    case 'Image':
      return (
        <img
          src={props.src}
          alt={props.alt}
          className="block"
          style={{
            width: props.width,
            height: props.height,
            borderRadius: props.borderRadius
          }}
        />
      );

    case 'Input':
      return (
        <input
          type={props.type}
          placeholder={props.placeholder}
          className="w-full"
          style={{
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            borderRadius: props.borderRadius,
            border: '1px solid'
          }}
          disabled={!isPreview}
        />
      );

    case 'Container':
      return (
        <div
          className="min-h-[60px]"
          style={{
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            margin: props.margin,
            borderRadius: props.borderRadius,
            borderColor: props.borderColor,
            borderWidth: props.borderWidth,
            borderStyle: 'solid'
          }}
        >
          {component.children && component.children.length > 0 ? (
            component.children.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                isPreview={isPreview}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2">
              Drop components here
            </div>
          )}
        </div>
      );

    case 'Row':
      return (
        <div
          className="flex"
          style={{
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
            gap: props.gap,
            padding: props.padding
          }}
        >
          {component.children && component.children.length > 0 ? (
            component.children.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                isPreview={isPreview}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2">
              Drop components here
            </div>
          )}
        </div>
      );

    case 'Column':
      return (
        <div
          className="flex flex-col"
          style={{
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
            gap: props.gap,
            padding: props.padding
          }}
        >
          {component.children && component.children.length > 0 ? (
            component.children.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                isPreview={isPreview}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2">
              Drop components here
            </div>
          )}
        </div>
      );

    case 'List':
      return (
        <div className="divide-y divide-gray-200">
          {props.items.map((item: string, index: number) => (
            <div
              key={index}
              className="py-3 px-4"
              style={{ minHeight: props.itemHeight }}
            >
              {item}
            </div>
          ))}
        </div>
      );

    case 'Checkbox':
      return (
        <label className="flex items-center gap-2 p-2">
          <input
            type="checkbox"
            checked={props.checked}
            disabled={!isPreview}
            style={{ accentColor: props.color }}
            className="w-4 h-4"
          />
          <span>{props.label}</span>
        </label>
      );

    case 'Switch':
      return (
        <label className="flex items-center gap-2 p-2">
          <div
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              props.enabled ? 'bg-blue-600' : 'bg-gray-200'
            )}
            style={{ backgroundColor: props.enabled ? props.color : '#e5e7eb' }}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                props.enabled ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </div>
          <span>{props.label}</span>
        </label>
      );

    case 'Video':
      return (
        <video
          src={props.src}
          poster={props.poster}
          controls={props.controls}
          autoPlay={props.autoPlay && isPreview}
          style={{
            width: props.width,
            height: props.height
          }}
          className="rounded"
        />
      );

    case 'Audio':
      return (
        <audio
          src={props.src}
          controls={props.controls}
          autoPlay={props.autoPlay && isPreview}
          className="w-full"
        />
      );

    case 'NavigationBar':
      return (
        <div
          className="flex items-center justify-between px-4"
          style={{
            backgroundColor: props.backgroundColor,
            color: props.textColor,
            height: props.height
          }}
        >
          {props.showBackButton && (
            <button className="text-current">←</button>
          )}
          <h1 className="font-semibold">{props.title}</h1>
          <div></div>
        </div>
      );

    case 'TabBar':
      return (
        <div
          className="flex"
          style={{ backgroundColor: props.backgroundColor }}
        >
          {props.tabs.map((tab: any) => (
            <div
              key={tab.id}
              className="flex-1 flex flex-col items-center py-2"
              style={{
                color: tab.id === props.activeTab ? props.activeColor : props.inactiveColor
              }}
            >
              <div className="w-6 h-6 mb-1">📱</div>
              <span className="text-xs">{tab.title}</span>
            </div>
          ))}
        </div>
      );

    case 'Chart':
      return (
        <div
          className="border rounded p-4 bg-white"
          style={{ width: props.width, height: props.height }}
        >
          <div className="text-sm font-medium mb-2">Chart ({props.type})</div>
          <div className="flex items-end space-x-1 h-32">
            {props.data.map((item: any, index: number) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t"
                  style={{
                    backgroundColor: props.primaryColor,
                    height: `${(item.value / 60) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'Calendar':
      return (
        <div className="border rounded p-4 bg-white">
          <div className="text-sm font-medium mb-2">Calendar</div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center font-medium p-1">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "text-center p-1 rounded",
                  i === 15 && "bg-blue-500 text-white"
                )}
              >
                {i + 1 <= 31 ? i + 1 : ''}
              </div>
            ))}
          </div>
        </div>
      );

    case 'Map':
      return (
        <div
          className="border rounded bg-green-100 flex items-center justify-center"
          style={{ width: props.width, height: props.height }}
        >
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-sm">Map View</div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 text-gray-500 text-center">
          Unknown component: {type}
        </div>
      );
  }
}
