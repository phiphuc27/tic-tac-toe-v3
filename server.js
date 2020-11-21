const express = require('express');
const connectDB = require('./config/db');
const Cors = require('cors');
const passport = require('passport');
require('./middleware/passport');

const app = express();

connectDB();

// app.use(Cors({ origin: true }));
app.use(passport.initialize());
app.use(express.json({ extended: false }));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run on PORT ${PORT}`));
