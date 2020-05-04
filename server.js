const app = require('./app');
require('dotenv').config({path: __dirname + '/.env'});

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on port %d', PORT);
});
