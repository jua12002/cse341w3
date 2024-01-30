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

// Insert a few documents into the sales collection.
db.getCollection('contacts').insertMany([
  { firstName: 'Faby', lastName: 'Juz',   email: '2@gmail.com', favoriteColor: 'Blue', date: new Date('2014-03-17') },
  { firstName: 'Kim', lastName: 'Sac',   email: '3@gmail.com', favoriteColor: 'Grey', date: new Date('2014-03-16') },
  { firstName: 'Bear', lastName: 'Saj',   email: '1@gmail.com', favoriteColor: 'Red', date: new Date('2014-03-23') }
]);


db.getCollection('contacts').insertOne([
  { firstName: 'Buddy', lastName: 'Saj',   email: 'B@gmail.com', favoriteColor: 'Red', date: new Date('2014-03-23') }
]);


db.getCollection('contacts').getAll([
  {getAll}
]); 

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db
  .getCollection('contacts')
  .find({
    date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
  })
  .count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('contacts').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } } } }
]);
