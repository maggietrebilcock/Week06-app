// API to return ALL documents in "resources" firestore collection

// import our firebase lib, returns firestore db in firebase var
import firebase from "../../lib/firebase";

// export our asynchronous default api function (async so we can use await inside) 
export default async function handler(req, res) {
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from our firestore collection named "resources"
    const snapshot = await firebase.collection("resources").get();
    
    // loop thru and build out an array of all data from firestore collection documents
    let output = [];
    snapshot.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        output.push( { id:doc.id, data:doc.data() } );
      }
    );

    // return OK http code and JSON object with all firestore data
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ output });
  } catch(error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }

}
