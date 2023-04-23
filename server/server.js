const Express = require('express');
const app = Express();
require('dotenv/config');
const port = process.env.PORT;
const userRoutes = require('../routes/user.routes');
const cors = require('cors');
const morgan = require('morgan');
require('../database/dbConnection');
const login = require('../routes/login.routes');

app.use(Express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/login', login);

app.listen(port, () => {
  console.log(`escuchando el puerto ${port}`);
});

