/******************/
/* Import Modules */
/******************/
const dotenv = require('dotenv').config();

const express = require('express');
const app = express()


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

const Player = require('./models/player')

/*****************/
/* Define routes */
/*****************/

// List entry route
app.get('/api/guild', async (request, response) => {

  const players = await Player.find()

  response.send(players)

})

// Item route
app.get('/api/guild/:name', async (request, response) => {

  // TODO: try/catch null response when name doesn't exist
  try {
    const player = await Player.findOne({name: request.params.name})
    if (!player) {
      throw new Error()
    }
    response.send(player)
  } catch(err) {
    response.send({error: 'Player Not Found'})
  }
  
})


app.post('/api/guild', async (request, response) => {
  //todo add some validation with a try catch block
  //todo redirect to static response pages depending on try catch result
  try {
  const player = new Player(request.body)
  
  await player.save()

  response.redirect('/success.html')
  }catch(err){
    response.redirect('/fail.html')
  }
})


/****************************/
/* Handle 404, start server */
/****************************/

// Handle 404 errors with middleware
app.use(function(request, response) {

  // If path starts with `/api`, send JSON 404
  if (request.url.startsWith('/api')) {

    response.status(404)
    response.send({error: 'File Not Found'})

  } else {
  
    // else send HTML 404
    response.status(404)
    response.send('<h1>404: File Not Found</h1>')

  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});