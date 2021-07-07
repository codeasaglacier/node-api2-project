const express = require( "express" )

const router = express.Router()


router.get( "/", ( req, res ) => {
  res.json( {
    message: "Welcome to the LOTR/Tao de ching API"
  } )
} )

//export the router
module.exports = router  