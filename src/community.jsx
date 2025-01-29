import React, { useState, useEffect } from "react";

function Community() {
  const [communityName, setCommunityName] = useState("");
  const [location, setLocation] = useState("");
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/api/communities');
        if (response.ok) {
          const data = await response.json();
          setCommunities(data);
        } else {
          throw new Error('Failed to fetch communities');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: communityName,
          location: location
        }),
      });

      if (response.ok) {
        const newCommunity = await response.json();
        setCommunities([...communities, newCommunity]);
        
        // Reset form
        setCommunityName("");
        setLocation("");
      } else {
        throw new Error('Failed to create community');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Community Management</h1>
      
      {/* Create Community Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Community</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="communityName" className="block text-sm font-medium mb-1">
              Community Name
            </label>
            <input
              id="communityName"
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              placeholder="Enter community name"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Create Community
          </button>
        </form>
      </div>

      {/* Communities List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Communities List</h2>
        
        {isLoading && <p>Loading communities...</p>}
        
        {error && (
          <div className="text-red-500 mb-4">
            Error: {error}
          </div>
        )}
        
        {!isLoading && !error && (
          <ul className="space-y-4">
            {communities.length > 0 ? (
              communities.map((community) => (
                <li 
                  key={community.id} 
                  className="border rounded p-4 hover:bg-gray-50"
                >
                  <h3 className="font-medium">{community.name}</h3>
                  <p className="text-gray-600">{community.location}</p>
                </li>
              ))
            ) : (
              <p>No communities found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Community;