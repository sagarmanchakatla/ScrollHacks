// src/Calendar.js
import React, { useEffect, useState } from 'react';
import './Calendar.css'; // Ensure you have this CSS file for additional styling

const Calendar = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [meetings, setMeetings] = useState({}); // To store scheduled meetings
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [meetingRoomId, setMeetingRoomId] = useState(''); // State to hold the Meeting Room ID
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Define time slots

    // Pre-booked meetings for demonstration
    const preBookedMeetings = {
        '2024-09-30': ['09:00', '11:00'],
        '2024-10-02': ['14:00', '15:00'],
        '2024-10-05': ['10:00', '16:00'],
    };

    // Merge pre-booked meetings with state
    useEffect(() => {
        setMeetings(prevMeetings => ({
            ...prevMeetings,
            ...preBookedMeetings,
        }));
    }, []);

    const generateCalendar = () => {
        const calendarElement = document.getElementById('calendar');
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Clear the calendar
        calendarElement.innerHTML = '';

        // Create headers for the days of the week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'text-center font-semibold';
            dayElement.innerText = day;
            calendarElement.appendChild(dayElement);
        });

        // Create empty boxes for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDayElement = document.createElement('div');
            calendarElement.appendChild(emptyDayElement);
        }

        // Create boxes for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentYear}-${currentMonth + 1}-${day}`;
            const dayElement = document.createElement('div');
            dayElement.className = 'text-center py-4 border cursor-pointer relative transition-colors duration-300 hover:bg-gray-200';
            dayElement.innerText = day;

            // Show meetings for the day
            if (meetings[date]) {
                meetings[date].forEach((meeting, index) => {
                    const meetingElement = document.createElement('div');
                    meetingElement.className = 'absolute bg-red-300 rounded p-1 mt-1 text-xs';
                    meetingElement.innerText = meeting;
                    dayElement.appendChild(meetingElement);
                });
            }

            dayElement.onclick = () => {
                setSelectedDate(date);
                setSelectedTime(''); // Reset selected time when a new date is chosen
            };

            calendarElement.appendChild(dayElement);
        }
    };

    const scheduleMeeting = () => {
        if (!selectedDate || !selectedTime) return;

        const updatedMeetings = { ...meetings };
        if (!updatedMeetings[selectedDate]) {
            updatedMeetings[selectedDate] = [];
        }
        updatedMeetings[selectedDate].push(selectedTime);
        setMeetings(updatedMeetings);
        setSelectedTime('');
        alert(`Meeting scheduled on ${selectedDate} at ${selectedTime}. Meeting Room ID: ${meetingRoomId}`);
    };

    const availableSlots = () => {
        if (!selectedDate || !meetings[selectedDate]) return timeSlots;

        return timeSlots.filter(slot => !meetings[selectedDate].includes(slot));
    };

    // Function to generate a random 6-character alphanumeric code
    const generateMeetingRoomId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setMeetingRoomId(code);
    };

    useEffect(() => {
        generateCalendar();
    }, [currentYear, currentMonth, meetings]);

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen font-poppins mt-10" >
            <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-4 mt-10">Meeting Scheduler</h1>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
                        <button onClick={() => setCurrentMonth(currentMonth - 1)} className="text-white">Previous</button>
                        <h2 className="text-white">{`${currentMonth + 1}/${currentYear}`}</h2>
                        <button onClick={() => setCurrentMonth(currentMonth + 1)} className="text-white">Next</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-4" id="calendar"></div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Schedule a Meeting</h3>
                    <div className="mt-2">
                        <h4 className="font-medium">Selected Date: {selectedDate || 'None'}</h4>
                        <select 
                            value={selectedTime} 
                            onChange={(e) => setSelectedTime(e.target.value)} 
                            className="border rounded p-2 mr-2 mt-1"
                        >
                            <option value="">Select Time Slot</option>
                            {availableSlots().map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <button 
                            onClick={scheduleMeeting} 
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            Confirm Schedule
                        </button>
                    </div>
                    <div className="mt-4">
                        <button 
                            onClick={generateMeetingRoomId} 
                            className="bg-green-500 text-white rounded px-4 py-2"
                        >
                            Generate Meeting Room ID
                        </button>
                        {meetingRoomId && (
                            <div className="mt-2 p-2 bg-gray-200 rounded">
                                <strong>Meeting Room ID:</strong> {meetingRoomId}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
