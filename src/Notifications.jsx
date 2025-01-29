import React, { useEffect, useState } from "react";

function Notifications({ communityId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notifications based on communityId
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?community_id=${communityId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [communityId]);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <strong>{notification.name}</strong> - {notification.rsvp}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications found for this community.</p>
      )}
    </div>
  );
}

export default Notifications;