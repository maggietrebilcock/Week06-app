// API to return ONE matching document in "resources" firestore collection by query

// import our firebase lib, returns firestore db in firebase var
import firebase from "../../lib/firebase";

// export our asynchronous default api function (async so we can use await inside) 
export default async function handler(req, res) {
  // wrap try around our code to catch any errors that happen
  try {
    // console.log( req.query.name );

    // retrieve ONE document matched by "name" field
    const collectionRef = firebase.collection("resources");
    const snapshot = await collectionRef.where("name", "==", req.query.name).get();

    // return all data from firestore document as json
    let output;
    if (!snapshot.empty) {
      snapshot.forEach(
        (doc) => {
          // console.log(doc.id, '=>', doc.data() )
          output = { id:doc.id, data:doc.data() };
        }
      );
    } else {
      output = null;
    }

    // return OK http code and JSON object with all firestore data
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ output });
  } catch(error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }

}
