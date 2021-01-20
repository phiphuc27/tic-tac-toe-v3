const socketIO = require('socket.io');

const socketConnect = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        const id = socket.handshake.query.id;
        const rooms = io.sockets.adapter.rooms;

        console.log(`user ${id} connected.`);

        socket.leave(socket.id);

        socket.on('join-room', ({ user }) => {
            if (rooms.size === 0) {
                socket.join(id);
            }
            rooms.forEach((clients, room) => {
                if (room !== socket.id && clients.size < 2) {
                    socket.join(room);
                    socket.to(room).emit('new-game', { player: user, room });
                    socket.emit('new-game', { player: room, room });
                }
            });
            console.log(rooms);
        });

        socket.on('send-square', ({ square, room }) => {
            socket.to(room).emit('receive-square', { square });
        });

        socket.on('disconnecting', () => {
            rooms.forEach((clients, room) => {
                if (clients.has(socket.id)) {
                    socket.to(room).emit('player-leave');
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`user ${id} disconnected.`);
        });
    });
};

module.exports = socketConnect;
