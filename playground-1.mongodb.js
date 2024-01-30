/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert MANY.
db.getCollection('contacts').insertMany([
  { firstName: 'Faby', lastName: 'Juz',   email: '2@gmail.com', favoriteColor: 'Blue', date: new Date('2014-03-17') },
  { firstName: 'Kim', lastName: 'Sac',   email: '3@gmail.com', favoriteColor: 'Grey', date: new Date('2014-03-16') },
  { firstName: 'Bear', lastName: 'Saj',   email: '1@gmail.com', favoriteColor: 'Red', date: new Date('2014-03-23') }
]);

//CREATE NEW CONTACT
//router.post('/', contactsController.createContact);
db.getCollection('contacts').insertOne([
  { firstName: 'Buddy', lastName: 'Saj',   email: 'B@gmail.com', favoriteColor: 'Red', date: new Date('2014-03-23') }
]);

//DELETE
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: "65b86c9440a787309e1078e7" }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

//UPDATE
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};





db.getCollection('contacts').getAll([
  {getAll}
]); 



router.get('/:id', contactsController.getSingle);



router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;

// Run a find command to view items sold on April 4th, 2014.
const onApril = db
  .getCollection('contacts')
  .find({
    date: { $gte: new Date('2014-03-23') } 
    //date: { $gte: new Date('2014-04-01'), $lt: new Date('2014-04-30') }
  })
  //.count();

// Print a message to the output window.
console.log(`${onApril} from April.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('contacts').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } } } }
]);



