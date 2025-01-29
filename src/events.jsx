import React, { useState, useEffect } from "react";

function Events({ communityId }) {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/communities/${communityId}/events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (communityId) {
      fetchEvents();
    }
  }, [communityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEvent = {
      eventName,
      location,
      eventDate,
      communityId
    };

    try {
      const response = await fetch(`/api/communities/${communityId}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const createdEvent = await response.json();
        setEvents([...events, createdEvent]);
        
        
        setEventName("");
        setLocation("");
        setEventDate("");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Event Creation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event Name"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Current Events</h3>
        {events.length > 0 ? (
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.id} className="border p-3 rounded">
                <strong>{event.eventName}</strong>
                <div>{event.location}</div>
                <div>{new Date(event.eventDate).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found for this community.</p>
        )}
      </div>
    </div>
  );
}

export default Events;