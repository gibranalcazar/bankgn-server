const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Guardar en .env de back-end
/* let newUrl = 'mongodb+srv://gndatabase:<password>@cluster0.93yqqbv.mongodb.net/?retryWrites=true&w=majority' */
let newUrl = 'mongodb+srv://gndatabase:gnbase@cluster0.93yqqbv.mongodb.net/bankgn'
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(newUrl);

// Database Name
//const dbName = 'mongoGN2';
const dbName = 'mongoGN';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';
    var password = 'secret';
    var balance = Math.floor(Math.random()*10000);
    console.log('name:', name);
    console.log('email:', email);
    // insert into customer table
    const collection = db.collection('customersgn');

    const insertResult = await collection.insertOne({name, email, password, balance});
    console.log('Inserted documents =>', insertResult);
    // tambien puede ser: await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  
    // the following code examples can be pasted here...
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    
    // Find Documents with a Query Filter
    let filteredDocs = await collection.find({ email: 'user6612@mit.edu' }).toArray();
    console.log('Found documents filtered by { user1554: ... } =>', filteredDocs);
    console.log('Found documents filtered by { user: ... } balance =>', filteredDocs[0].balance);
    
    // Update a document
    const updateResult = await collection.updateOne({ email: 'user6612@mit.edu' }, { $set: { balance: 7200 } });
    console.log('Updated documents =>', updateResult);

    // Find Documents with a Query Filter
    filteredDocs = await collection.find({ email: 'user6612@mit.edu' }).toArray();
    console.log('Found documents filtered by { user: x } =>', filteredDocs);
    console.log('Found documents filtered by { user: x } balance =>', filteredDocs[0].balance);

    //Remove a document
    const deleteResult = await collection.deleteMany({ password: 'secreto'});  //abajo de  names: 'user7537',
    console.log('Deleted documents =>', deleteResult);

    try {
        await collection.insertOne({ _id: 1 });
        await collection.insertOne({ _id: 1 }); // duplicate key error
      } catch (error) {
        //if (error instanceof MongoServerError) {
        if (true) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
      }

    //Index a Collection
    /* const indexName = await collection.createIndex({ name: 2});
    console.log('index name =', indexName); */
  
    return 'done.';
  }

  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
  ;