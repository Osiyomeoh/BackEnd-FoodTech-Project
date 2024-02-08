const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Mock user database (replace this with your actual user database)
const users = [
  { id: 1, email: 'user@example.com', password: '$2b$10$V3J1y21dNxN1kP7..o2P4uFb.CzMMX2C/kb8U5rCB1miRz0cO27ey' }, // Hashed password: 'password'
];

// Passport local strategy for email and password login
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    const user = users.find(u => u.email === email);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }
));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Onboarding page route
app.post('/onboarding', (req, res) => {
  const { firstName, lastName, username, mobileNumber, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered.' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password.' });
    }

    // Create a new user
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      username,
      mobileNumber,
      email,
      password: hash
    };

    users.push(newUser);

    // Log the user in after onboarding
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login after onboarding.' });
      }

      // Redirect to the dashboard after successful onboarding and login
      return res.redirect('/dashboard');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const bcrypt = require('bcrypt');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Mock user database (replace this with your actual user database)
// const users = [
//   { id: 1, email: 'user@example.com', password: '$2b$10$V3J1y21dNxN1kP7..o2P4uFb.CzMMX2C/kb8U5rCB1miRz0cO27ey' }, // Hashed password: 'password'
// ];

// // Passport local strategy for email and password login
// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   (email, password, done) => {
//     const user = users.find(u => u.email === email);
//     if (!user) {
//       return done(null, false, { message: 'Incorrect email.' });
//     }
//     bcrypt.compare(password, user.password, (err, res) => {
//       if (res) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//     });
//   }
// ));

// // Passport serialization and deserialization
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// // Passport Google strategy for sign-in with Google
// passport.use(new GoogleStrategy({
//   clientID: 'your-google-client-id',
//   clientSecret: 'your-google-client-secret',
//   callbackURL: 'http://localhost:3000/auth/google/callback',
// },
// (accessToken, refreshToken, profile, done) => {
//   // Check if the user is already in the database or create a new user
//   const user = users.find(u => u.email === profile.emails[0].value);
//   if (user) {
//     return done(null, user);
//   } else {
//     const newUser = { id: users.length + 1, email: profile.emails[0].value };
//     users.push(newUser);
//     return done(null, newUser);
//   }
// }));

// // Registration route
// app.post('/register', (req, res) => {
//   const { email, password } = req.body;

//   // Check if the email is already registered
//   const existingUser = users.find(u => u.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: 'Email is already registered.' });
//   }

//   // Hash the password before storing it
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error hashing password.' });
//     }

//     // Create a new user
//     const newUser = { id: users.length + 1, email, password: hash };
//     users.push(newUser);

//     // Log the user in after registration
//     req.login(newUser, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error during login after registration.' });
//       }

//       // Redirect to the dashboard after successful registration and login
//       return res.redirect('/dashboard');
//     });
//   });
// });

// // Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Welcome to the home page');
// });

// // Login route
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login-failure' }),
//   (req, res) => {
//     res.redirect('/dashboard'); // Redirect to the dashboard after successful login
//   });

// // ... (rest of your existing routes)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
