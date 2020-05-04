const app = require('./app');
require('dotenv').config({path: __dirname + '/.env'});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on port %d', PORT);
});
