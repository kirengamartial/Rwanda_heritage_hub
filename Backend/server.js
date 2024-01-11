const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport');
const expressSession = require('express-session');
const Exhibit = require('./Model/exhibitModel')
const User = require('./Model/userModel')

require('dotenv').config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(expressSession({
  secret:  process.env.SECRET_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DbUrl)
  .then(() => {
    console.log('Db is connected')
    app.listen(port)
  })
  .catch(err => console.log(err))

app.get('/exhibits', async (req, res) => {
  try {
    const exhibits = await Exhibit.find();

    if (exhibits.length === 0) {
      return res.status(404).json({ error: 'No exhibits found.' });
    }

    res.json(exhibits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/exhibits', async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newExhibit = new Exhibit({
      title,
      description,
      image,
    });

    const savedExhibit = await newExhibit.save();

    res.json(savedExhibit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/exhibits/:id', async (req, res) => {
  try {
    const exhibitId = req.params.id;
    const exhibit = await Exhibit.findById(exhibitId);

    if (!exhibit) {
      return res.status(404).json({ error: 'Exhibit not found.' });
    }

    res.json(exhibit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/exhibits/:id', async (req, res) => {
  try {
    const exhibitId = req.params.id;

    // Check if exhibit exists
    const existingExhibit = await Exhibit.findById(exhibitId);
    if (!existingExhibit) {
      return res.status(404).json({ success: false, message: 'Exhibit not found.' });
    }

    // Update exhibit fields
    if (req.body.title) existingExhibit.title = req.body.title;
    if (req.body.description) existingExhibit.description = req.body.description;
    if (req.body.image) existingExhibit.image = req.body.image;

    // Save and return updated exhibit
    const updatedExhibit = await existingExhibit.save();
    res.json({ success: true, message: 'Exhibit updated successfully.', exhibit: updatedExhibit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



app.delete('/exhibits/:id', async (req, res) => {
  try {
    const exhibitId = req.params.id;
    const deletedExhibit = await Exhibit.findByIdAndDelete(exhibitId);

    if (!deletedExhibit) {
      return res.status(404).json({ success: false, message: 'Exhibit not found.' });
    }

    res.json({ success: true, message: 'Exhibit deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});





app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, isAdmin: req.user.isAdmin, username: req.user.firstname });
  } else {
    res.json({ isAuthenticated: false, isAdmin: false, username: "name" });
  }
});


app.post('/register', (req, res) => {
  const { firstname, lastname, useremail, password } = req.body;

  const newUser = new User({ firstname, lastname, useremail, isAdmin: false });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Registration failed.' });
    }
    passport.authenticate('local')(req, res, () => {
      req.session.isAuthenticated = true;
      res.json({ success: true, message: 'Registration successful.', user });
    });
  });
});

app.get('/get-username', (req, res) => {
  if (req.isAuthenticated()) {
    const { firstname, lastname, useremail } = req.user;
    res.json({ username: firstname, firstname, lastname, useremail });
  } else {
    res.json({ username: "name" });
  }
});

app.get('/get-all-users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.post('/update-user', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { firstname, lastname, useremail, password } = req.body;

      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (useremail) user.useremail = useremail;

      if (password) {
        await user.setPassword(password);

        const updatedUser = await user.save();
        return res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
      } else {
        const updatedUser = await user.save();
        return res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
      }
    } else {
      return res.status(401).json({ success: false, message: 'User not authenticated.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Profile update failed.' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.put('/users/make-admin/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Update user's isAdmin field
    existingUser.isAdmin = !existingUser.isAdmin;

    // Save and return updated user
    const updatedUser = await existingUser.save();
    res.json({ success: true, message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});





app.post('/login', passport.authenticate('local'), (req, res) => {
  req.session.isAuthenticated = true;
  res.json({ success: true, message: 'Login successful.' });
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Logout failed.' });
    }
    req.session.isAuthenticated = false;
    res.json({ success: true, message: 'Logout successful.' });
  });
});
