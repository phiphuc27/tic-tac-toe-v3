const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const socketConnect = require('./middleware/socket');
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

socketConnect(server);

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
