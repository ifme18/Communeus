import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    phoneNo: '',
    houseNo: '',
    communityId: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and communities
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch('/api/profile');
        const userData = await userResponse.json();
        setUser(userData);
        setFormData(userData);

        // Fetch available communities
        const communitiesResponse = await fetch('/api/communities');
        const communitiesData = await communitiesResponse.json();
        setCommunities(communitiesData);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!user) return <div className="p-4">No user data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        {!isEditing ? (
          // Profile View Mode
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Occupation</h3>
                <p>{user.occupation}</p>
              </div>
              <div>
                <h3 className="font-medium">Phone Number</h3>
                <p>{user.phoneNo}</p>
              </div>
              <div>
                <h3 className="font-medium">House Number</h3>
                <p>{user.houseNo}</p>
              </div>
              <div>
                <h3 className="font-medium">Community</h3>
                <p>{communities.find(c => c.id === user.communityId)?.name || 'Not specified'}</p>
              </div>
            </div>
          </div>
        ) : (
          // Profile Edit Mode
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">House Number</label>
              <input
                type="number"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Community</label>
              <select
                name="communityId"
                value={formData.communityId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a community</option>
                {communities.map(community => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;