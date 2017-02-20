import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// TODO: import models and routes
import { DB_Init } from './app/services/games';
import { getGame, postGame} from './app/routes/game';
DB_Init();

const app = express();
const port = process.env.PORT || 8080;

// TODO: DB connection through mongoose

// bodyParser and morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + 'client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Method', "GET, POST, DELETE");
	res.header('Access-Control-Allow-Headers', "Origin, Content-type, Accept, X-Request-With");

	next();
})

// TODO: bind routes
app.route('/games')
  .post(postGame)

app.route('/games/:id')
  .get(getGame)

// send all the other request to home page
app.route("*").get((req, res) => {
	res.sendFile('client/dist/index.html', {root: __dirname});
});

app.listen(port);

console.log(`listen on port ${port}`);