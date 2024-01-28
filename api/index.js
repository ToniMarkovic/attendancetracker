const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://markovictoni9:markovictoni9@cluster0.saeijml.mongodb.net/',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to mongoDB', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const User = require('./models/user');
const Attendance = require('./models/attendance');

app.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log('Name', name);
    console.log('Email', email);
    console.log('Password', password);

    // check if email is already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      console.log('Email is already registered');
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(202).json({message: 'User registerd successfully'});
  } catch (error) {
    console.log('Error registering the user', error);
    res.status(500).json({message: 'Registration failed'});
  }
});

const secretKey = 'my_secret_key';

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'Invalid email'});
    }

    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid password'});
    }

    const token = jwt.sign({userId: user._id, username: user.name}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    console.log('Login failed', error);
    res.status(500).json({message: 'Login failed'});
  }
});

app.post('/attendance', async (req, res) => {
  try {
    const {studentName} = req.body;

    const newAttendance = new Attendance({
      studentName,
    });

    await newAttendance.save();

    res.status(200).json({message: 'Attendance added successfully'});
  } catch (error) {
    res.status(500).json({message: 'Attendance not added'});
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const allAttendances = await Attendance.find();

    res.status(200).json({allAttendances});
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'});
  }
});

app.get('/user/posts', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, secretKey);
    const studentName = decodedToken.username;

    const userAttendances = await Attendance.find({studentName});

    res.status(200).json({userAttendances});
  } catch (error) {
    console.log('Error fetching user posts', error);
    res.status(500).json({message: 'Error fetching user posts'});
  }
});
