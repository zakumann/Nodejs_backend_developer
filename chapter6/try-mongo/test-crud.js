const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://samuel742:Gunzaku42th@test.htaezp5.mongodb.net/?retryWrites=true&w=majority";

// Create MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

async function main(){
    try {
        //Create Connection and link
        await client.connect();

        console.log('Connect with MongoDB');

        const collection = client.db('test').collection('person');

        //add one document
        await collection.insertOne({ name: 'Andy', age: 30 });
        console.log('Add Document');

        // Search document.
        const documents = await collection.find({ name: 'Andy' }).toArray();
        console.log('Found document:', documents);

        // Renewal document
        await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
        console.log('Update document');

        // Confirm an updated document.
        const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
        console.log('Renewaled document :', updatedDocuments);

        // Delete document
        // await collection.deleteOne({ name: 'Andy' });
        // console.log('Delete Document');

        // Disconnection
        await client.close();
    } catch (err){
        console.err(err);
    }
}

main();