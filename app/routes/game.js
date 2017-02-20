// import { getGamesFromDB, putGameFromDB} from '../services/games';
import AWS from 'aws-sdk';
import cred from './../config/user.json';

var client = new AWS.DynamoDB.DocumentClient(
	{
		accessKeyId : cred.Access_key,
		secretAccessKey : cred.Secret_access,
		region : 'us-west-2'
	}
);

// const getGames = (req, res) => {
// 	getGamesFromDB().then(
// 		(data) => {
// 			res.json(data);
// 		},
// 		(err) => {
// 			res.send(err);
// 		}
// 	)
// }

const getGame = (req, res) => {
	const { id } = req.params;
  var params = {
  	TableName: "Games",
  	Key: {
  		name: id,
  	}
  }
	client.get(params, (err, data) => {
		if (err) {
			console.log(err, err.stack);
			res.send(err);
		}else{
      res.json(data);
		}
	})
}

const postGame = (req, res) => {
	var params = {
		TableName: 'Games',
		Item: req.body
	};

	client.put(params, (err, data) => {
		if (err) {
			console.log(err, err.stack);
			res.send(err);
		}else{
			res.json(data);
		}
	})
}

// const deleteGame = (req, res) => {
// 	let { id } = req.params;

// 	Game.remove(
// 	    {_id: id},
// 	    err => {
// 	    	if (err) {
// 	    		res.send(err);
// 	    	}
// 	    }

// 	    res.json({ message: 'game deleted' });
// 	)
// }

export { getGame, postGame};