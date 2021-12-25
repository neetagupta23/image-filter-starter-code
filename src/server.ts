import express  from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get("/filteredimage",(req , res ) =>
   {
     let {image_url}= req.query;
    
     if ( !image_url ) {
      return res.status(400)
                .send(`Url of image is required`);
     }
  
    (async () => {
     const localurlPath= await filterImageFromURL(image_url).then((localurl)=>
      {
         return localurl;
      }).catch((error)=>
      {
        return error; 
      })
      ;
      res.sendFile(localurlPath, function (err) {
        if (err) {
         
        } else {
       
            deleteLocalFiles([localurlPath])
        }
    });

       }  ) 

    ();

  
     });
     
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();