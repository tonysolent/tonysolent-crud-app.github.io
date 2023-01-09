const express = require('express');
const fs = require('fs');
const db = require('./db'); // The database connection
const Item = require('./item'); // The item model

const app = express();

// Set up the routes

// The root route returns a list of all items in the database
app.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.send(err);
    } else {
      const html = `
        <h1>All items</h1>
        <ul>
          ${items
            .map(
              item => `
            <li>
              <h2>${item.name}</h2>
              <p>${item.description}</p>
              <p>${item.price}</p>
            </li>
          `
            )
            .join('')}
        </ul>
      `;
      res.send(html);
    }
  });
});

// The create route adds a new item to the database
app.post('/create', (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  item.save((err, item) => {
    if (err) {
      res.send(err);
    } else {
      const html = `
        <h1>Item created</h1>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.price}</p>
      `;
      res.send(html);
    }
  });
});

// The update route updates an existing item in the database
app.put('/update/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    },
    (err, item) => {
      if (err) {
        res.send(err);
      } else {
        const html = `
          <h1>Item updated</h1>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p>${item.price}</p>
        `;
        res.send(html);
    }
  });
});

