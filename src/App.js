import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Assuming your WebSocket server is running on this URL
const SOCKET_SERVER_URL = 'http://localhost:5000';

// const SOCKET_SERVER_URL = 'https://imp-server.vercel.app'; 

const App = () => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null); // Example state to hold data received from the server

  // Effect to establish socket connection
  useEffect(() => {
    // Create WebSocket connection
    const newSocket = io(SOCKET_SERVER_URL);
       // Handle events
    newSocket.on('connect', () => {
        console.log('Connected to server');
    });
    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    console.log(newSocket);
    setSocket(newSocket);
     
    // Event listener for "dataUpdated" messages from the server
    newSocket.on('dataUpdated', (updatedData) => {
      console.log('Data updated:', updatedData);
      setData(updatedData); // Update your component state with the new data
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect(); // Disconnect when component unmounts
    };
  },[]);

  return (
    <div>
      <h1>The Ultimate sameer kadu project</h1>
      {/* Displaying the data received from WebSocket server */}
      <p>Data:  
      {data &&
      <div>
      <p>v1: {data.v1}</p>
      <p>v2: {data.v2}</p>
      <p>v3: {data.v3}</p>
      <p>v4: {data.v4}</p>
      <p>v5: {data.v5}</p>
      </div>
      }
      </p>
    </div>
  );
};

export default App;
