import React from "react";


function events(){
    const handleSubmit =(e) =>{

    }
    <div>
        <h2>Event Creation</h2>
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            placeholder="Event Name" 
            required />
            <input type="text"
            value={location}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="location"
            required />
            <h3>Current Events</h3>
       <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.eventname}</strong> - {new Date(event.eventdate).toLocaleString()}
          </li>
        ))}
      </ul>
        </form>
    </div>

}

export default events