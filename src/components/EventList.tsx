import React, { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { format, isSameDay } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useCalendarStore } from '../store/calendarStore';

// Mock events data - in a real app, this would come from an API
const generateMockEvents = (date: Date) => {
  const events = [];
  const day = date.getDate();
  
  for (let i = 0; i < 10; i++) {
    events.push({
      id: `${date.toISOString()}-${i}`,
      title: `Event ${i + 1}`,
      description: `Description for event ${i + 1}`,
      time: `${9 + i}:00`,
      date: date,
    });
  }
  return events;
};

export function EventList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const { selectedDate } = useCalendarStore();
  
  const events = generateMockEvents(selectedDate);

  const rowVirtualizer = useVirtual({
    size: events.length,
    parentRef,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-auto bg-gray-50"
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const event = events[virtualRow.index];
          
          return (
            <div
              key={virtualRow.index}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="m-2 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-800">
                  {event.title}
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(event.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}