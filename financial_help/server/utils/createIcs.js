const createIcsEvent = (eventDetails) => {
    return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
BEGIN:VEVENT
SUMMARY:${eventDetails.summary}
LOCATION:${eventDetails.location}
DESCRIPTION:${eventDetails.description}
DTSTART:${eventDetails.startTime} // Format: YYYYMMDDTHHMMSSZ
DTEND:${eventDetails.endTime}     // Format: YYYYMMDDTHHMMSSZ
ATTENDEE;CN=${eventDetails.attendeeName};RSVP=TRUE:mailto:${eventDetails.attendeeEmail}
END:VEVENT
END:VCALENDAR
    `;
};

module.exports = { createIcsEvent };
