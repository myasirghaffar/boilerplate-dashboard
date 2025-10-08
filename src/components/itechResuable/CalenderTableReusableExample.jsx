import React from 'react';
import CalenderTableReusable from './CalenderTableReusable';

// Example usage of the reusable calendar component
const CalenderTableReusableExample = () => {
  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: 'Feira de Ciência',
      date: new Date(2025, 10, 1), // November 1, 2025
      description: 'Annual science fair event',
      color: 'orange'
    },
    {
      id: 2,
      title: 'Reunião de Pais',
      date: new Date(2025, 10, 5), // November 5, 2025
      description: 'Parent-teacher meeting',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Exame Final',
      date: new Date(2025, 10, 15), // November 15, 2025
      description: 'Final examination',
      color: 'red'
    },
    {
      id: 4,
      title: 'Festa de Formatura',
      date: new Date(2025, 10, 20), // November 20, 2025
      description: 'Graduation ceremony',
      color: 'green'
    }
  ];

  // Custom handlers
  const handlePrint = () => {
    console.log("Custom print handler");
    // Add your custom print logic here
  };

  const handleDownload = () => {
    console.log("Custom download handler");
    // Add your custom download logic here
  };

  const handleDateClick = (day, date) => {
    console.log(`Date clicked: ${day}`, date);
    // Add your custom date click logic here
  };

  const handleEventClick = (event, day, date) => {
    console.log(`Event clicked: ${event.title} on day ${day}`, event);
    // Add your custom event click logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reusable Calendar Examples</h1>
      
      {/* Example 1: Basic Calendar with Default Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Calendar (Default Settings)</h2>
        <CalenderTableReusable />
      </div>

      {/* Example 2: Calendar with Custom Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar with Custom Events</h2>
        <CalenderTableReusable
          events={sampleEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </div>

      {/* Example 3: Calendar with Custom Initial Date */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar with Custom Initial Date</h2>
        <CalenderTableReusable
          initialDate={new Date(2025, 0, 1)} // January 2025
          events={sampleEvents}
        />
      </div>

      {/* Example 4: Calendar without Action Buttons */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar without Action Buttons</h2>
        <CalenderTableReusable
          showActionButtons={false}
          events={sampleEvents}
        />
      </div>

      {/* Example 5: Calendar with Custom Styling */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar with Custom Styling</h2>
        <CalenderTableReusable
          className="border-2 border-blue-200"
          headerClassName="bg-blue-50"
          gridClassName="bg-blue-100"
          dayClassName="hover:bg-blue-100"
          eventClassName="bg-blue-500 hover:bg-blue-600"
          events={sampleEvents}
        />
      </div>

      {/* Example 6: Calendar with Custom Month Names (English) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar with English Month Names</h2>
        <CalenderTableReusable
          months={[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ]}
          daysOfWeek={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
          events={sampleEvents}
        />
      </div>

      {/* Example 7: Calendar with Custom Handlers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendar with Custom Handlers</h2>
        <CalenderTableReusable
          events={sampleEvents}
          onPrint={handlePrint}
          onDownload={handleDownload}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default CalenderTableReusableExample;
