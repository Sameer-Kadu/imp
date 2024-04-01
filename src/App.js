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
    <div style={{ backgroundImage: "url('../public/back.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
      <center><h1>Multi-Utility real-time Energy Management controller</h1>
      {/* Displaying the data received from WebSocket server */}
      <p>Data:  
      {data &&
     <div id='test'>
     <div>
   <h2>v1: {data.v1}</h2>
   <h2>v2: {data.v2}</h2>
   <h2>v3: {data.v3}</h2></div>
   <div>
   <h2>v4: {data.v4}</h2>
   <h2>v5: {data.v5}</h2>
   <h2>v6: {data.v6}</h2>
   </div>
   </div>
      }
      
      </p>
      </center>
    </div>
  );
};

export default App;
