const express = require( "express" )

const db = require( "../data/db" )

const router = express.Router()


router.get( "/", ( req, res ) => {
  db.find()
    .then( ( posts ) => {
      res.status( 200 ).json( posts )
    })
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "The posts information could not be retrieved."
      } )
    })
} )

router.get("/:id", (req, res) => {
	db.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist."
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The post information could not be retrieved."
			})
		})
})

router.get( "/:id/comments", ( req, res ) => {
  db.findPostComments( req.params.id, req.body )
    .then( ( posts ) => {
      if ( posts ) {
        res.status( 200 ).json( posts )
      } else {
        res.status(404).json({
					message: "The post with the specified ID does not exist."
				})
      }
    })
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "The comments information could not be retrieved."
      } )
    })
} )

router.get( "/:id/comments/:commentId", ( req, res )  => {
  db.findCommentById( req.params.id, req.params.postId )
    .then( ( post ) => {
      if ( post ) {
        res.json( post )
      } else {
        res.status( 404 ).json( {
          message: "The post with the specified ID does not exist."
        } )
      }
    } )
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "The comments information could not be retrieved."
      } )
    } )
} )

router.post("/", (req, res) => {
	if (!req.body.title || !req.body.contents ) {
		return res.status(400).json({
			message: "Please provide title and contents for the post."
		})
	}

	db.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "There was an error while saving the post to the database"
			})
		})
})
//Needs to be corrected, 500 Internal Server Error
router.post( "/:id/comments", ( req, res ) => {
  if ( !req.body.text ) {
    return res.status( 400 ).json( {
      message: "Please provide text for the comment."
    } )
  } else if ( !req.params.id ) {
    return res.status( 404 ).json( {
      message: "The post with the specified ID does not exist."
    } )
  }

  db.insertComment( req.params.id, req.body )
    .then( ( post ) => {
      res.status( 201 ).json( post )
    } )
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "There was an error while saving the comment to the database"
      } )
    } )
} )
//Needs error check
router.put("/:id", (req, res) => {
	if (!req.body.title || !req.body.contents ) {
		return res.status(400).json({
			message: "Please provide title and contents for the post."
		})
	}
  
	db.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist."
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The post information could not be modified."
			})
		})
})
//Needs error check
router.delete("/:id", (req, res) => {
	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post was delorted",
				})
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist."
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The post could not be removed"
			})
		})
})




//export the router
module.exports = router  