import Express from 'express';
import { createServer } from 'http';
import routes from './routes';

var app = Express();
const server = createServer(app);

app.use('/', routes);

app.get('/', (req, res) => {
    res.send({ status: 'App initialized' }).end();
});

server.listen(8080, () => {
    console.log('App initialization');
});

module.exports = server;
