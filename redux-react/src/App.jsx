import React from 'react';
import PostList from './PostList';
import './App.css';

function App() {
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Posts</h1>
                <PostList />
            </div>
        </div>
    );
}

export default App;