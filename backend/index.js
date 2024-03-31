import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('updateData', (data) => {
    // Perform the update operation here
    // Then emit an event to update clients
    io.emit('dataUpdated', data); // This sends the update to all connected clients
  });
});

io.on('connect_error', (err) => {
  console.log(err);
});

// HTTP POST endpoint to update data
app.post('/updateData', (req, res) => {
  const data = req.body; // Assuming the request body contains the data to update
  console.log('Received update:', data);

  // Here you would typically process the data, 
  // such as saving it to a database or modifying it in some way

  // Emit the update to all connected WebSocket clients
  io.sockets.emit('dataUpdated', data);

  // Respond to the request indicating success
  res.status(200).send('Data updated successfully');
});





app.post('/api/sendnudes', (req, res) => {
    const {v1, v2, v3, v4, v5} = req.body;
    console.log(req.body)


    // res.render("display.ejs", {
    //   item1: v1,
    //   item2: v2,
    //   item3: v3,
    //   item4: v4,
    //   item5: v5,
    // })
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});