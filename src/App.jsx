import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Events from './components/Events';
import Community from './components/Community';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold">
                  Community Hub
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link 
                  to="/communities" 
                  className="px-3 py-2 rounded hover:bg-blue-700"
                >
                  Communities
                </Link>
                <Link 
                  to="/events" 
                  className="px-3 py-2 rounded hover:bg-blue-700"
                >
                  Events
                </Link>
                <Link 
                  to="/profile" 
                  className="px-3 py-2 rounded hover:bg-blue-700"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold mb-4">Welcome to Community Hub</h1>
                  <p className="text-gray-600">Connect with your community and stay updated with local events.</p>
                </div>
              } 
            />
            <Route 
              path="/communities" 
              element={<Community />} 
            />
            <Route 
              path="/events" 
              element={<Events communityId={/* Pass the current user's community ID here */} />} 
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <p>&copy; 2025 Community Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;