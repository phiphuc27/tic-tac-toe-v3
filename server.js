const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport');
require('./middleware/passport');

const app = express();

connectDB();

//app.use(cors({ origin: true }));
app.use(passport.initialize());
app.use(express.json({ extended: false }));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = normalizePort(process.env.PORT || '5000');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    console.log(`user ${id} connected.`);

    socket.on('join-room', ({ user }) => {
        const rooms = io.sockets.adapter.rooms;
        console.log(rooms);
        if (rooms) {
            rooms.forEach((clients, room) => {
                if (room !== socket.id && clients.size < 2) {
                    socket.join(room);
                    socket.leave(socket.id);

                    socket.to(room).emit('new-game', { user, room });
                    socket.emit('new-game', { user, room });
                }
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`user ${id} disconnected.`);
    });
});

server.listen(PORT, () => console.log(`Server run on PORT ${PORT}`));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
