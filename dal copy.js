const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
//const dbName = 'mongoGN2';
const dbName = 'mongoGN';
const db = client.db(dbName);
const collection = db.collection('customersgn');

async function main() {
    // Use connect method to connect to the server
    console.log('en main');
    await client.connect();
    console.log('Connected successfully to server!!');
//    db = client.db(dbName);
    return 'done.';
}

main()
.then(console.log)
.catch(console.error)
//.finally(() => client.close())
;

async function create(name, email, password, balance){
    // insert into customer table
    console.log('en create');
//    const collection = db.collection('customersgn');
    let insertResult;
    let doc = {name, email, password, balance};
    try {
        insertResult = await collection.insertOne(doc);
        console.log('Inserted documents =>', insertResult);
      } catch (error) {
        //if (error instanceof MongoServerError) {
        if (true) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log('insertResult: ',insertResult);
    /* return insertResult; */
    return doc;
};

async function all(){
    // insert into customer table
//    const collection = db.collection('customersgn');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    return findResult;
};

async function deposit(email, balance){
    // Update a document
    const updateResult = await collection.updateOne({ email: email }, { $set: { balance: balance } });
    console.log('Updated documents =>', updateResult);

    return updateResult;
};

async function withdraw(email, balance){
    // Update a document
    const updateResult = await collection.updateOne({ email: email }, { $set: { balance: balance } });
    console.log('Updated documents =>', updateResult);

    return updateResult;
};

async function balance(email){
    // Update a document
    // Find Documents with a Query Filter
    let filteredDocs = await collection.find({ email: email }).toArray();
    console.log('Actual Balance', filteredDocs);
    console.log('Actual Balance', filteredDocs[0].balance);

    return filteredDocs[0].balance;
};

module.exports = {create, all, deposit, balance, withdraw};