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
      res.sendFile(localurlPath);
     // res.sendStatus(200).send(localurl);
       }  ) //res.sendFile(localurl.);
 
       ();
    //res.sendFile(localurl);
   
    // else
    // filterImageFromURL(image_url).then((localpath)=>{
      //return res.sendFile(localpath);
     // return res.status(200)
     // .send(`Url of image is required,${image_url}`);
     });
    
    
   // let localUrl= filterImageFromURL(url).then(url).catch();
    // filterImageFromURL(url).then((localurl)=>
    // {
     
    // }).catch((error)=>{}).finally(()=>
    // {}
   //  );
      // return res.sendFile(localurl.then);
  // });
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
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