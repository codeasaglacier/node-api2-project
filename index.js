//rest architecture ( RESTful API )

//should have a single resource per endpoint - everything is a resource ( a piece of data, a user, order, product... )
//each one of these resources should have its own unique URL
//REST endpoints should be stateless


//NOT RESTful endpoints
// /listUsers
// /createUser
// /updateUser

//RESTful endpoints
//GET /users
//POST /users
//PUT or PATCH /users/:id
//DELETE /users/:id
//GET /users/:id/friends
//GET /users/:id/friends/:friendsId
//POST /users/:id/friends

const express = require( "express" )
const postRouter = require( "./post-router/post-router" )
const welcomeRouter = require( "./post-router/post-welcome" )

const server = express()
const port = 4000

server.use( express.json() )
server.use( "/api/posts", postRouter)
server.use( welcomeRouter )


server.listen( port, () => {
  console.log( `Server running at http://localhost:${ port }` )
} )