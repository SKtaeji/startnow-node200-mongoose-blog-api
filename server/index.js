const server = require('./app');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('The EXPRESS server is listening on port 3000.');
});