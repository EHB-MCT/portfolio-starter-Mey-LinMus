const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile'); // Import the Knex.js configuration

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Knex.js instance
const db = knex(knexfile.development);

app.use(express.json());

// Define your API routes and handlers here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, birthday, age } = req.body;
    const [userId] = await db('users').insert({ name, birthday, age });
    res.status(201).json({ id: userId, name, birthday, age });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding a user.' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const deletedCount = await db('users').where({ id: userId }).del();
    if (deletedCount === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});


app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, birthday, age } = req.body;

  try {
    // Check if the user with the specified ID exists
    const userExists = await db('users').where({ id: userId }).first();

    if (!userExists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create an object with the fields to update
    const updatedUser = {};
    if (name) updatedUser.name = name;
    if (birthday) updatedUser.birthday = birthday;
    if (age) updatedUser.age = age;

    // Update user information
    await db('users').where({ id: userId }).update(updatedUser);

    res.status(200).json({ id: userId, ...updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});
