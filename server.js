import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import pgSession from "connect-pg-simple";

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "e-commerce",
  password: process.env.DB_PASSWORD || "maeen2005",
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

// Session store
const PgSession = pgSession(session);
app.use(session({
  store: new PgSession({ pool }),
  secret: process.env.SESSION_SECRET || "your_secret_key_change_in_production",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", "./"); // if your .ejs files are in the root, or set to the correct folder

// Passport local strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const result = await pool.query('SELECT * FROM "user info" WHERE email = $1', [username]);
    if (result.rows.length === 0) return done(null, false, { message: "Incorrect email." });
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Incorrect password." });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM "user info" WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => {
  res.render("main", { user: req.user });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/cart", (req, res) => {
  res.render("cart-enhanced");
});

// Add product category routes
app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/fashion", (req, res) => {
  res.render("fashion");
});

app.get("/electronics", (req, res) => {
  res.render("electronics");
});

app.get("/accessories", (req, res) => {
  res.render("accessories");
});

app.get("/login", (req, res) => {
  const error = req.query.error;
  res.render("login", { error });
});

app.post("/login", (req, res, next) => {
  console.log('Login attempt:', { email: req.body.username });
  
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Login error:', err);
      return next(err);
    }
    if (!user) {
      console.log('Login failed:', info);
      return res.redirect("/login?error=" + encodeURIComponent(info.message));
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login session error:', err);
        return next(err);
      }
      console.log('User logged in successfully:', user.email);
      return res.redirect("/");
    });
  })(req, res, next);
});

app.get("/register", (req, res) => {
  const error = req.query.error;
  const success = req.query.success;
  res.render("register", { error, success });
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  
  // Log the incoming data
  console.log('Registration attempt:', { email, password: '***' });
  
  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM "user info" WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.redirect("/register?error=" + encodeURIComponent("User with this email already exists"));
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.redirect("/register?error=" + encodeURIComponent("Password must be at least 6 characters long"));
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO "user info" (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    
    console.log('User registered successfully:', result.rows[0]);
    
    // Auto-login the user after registration
    const user = result.rows[0];
    req.logIn(user, (err) => {
      if (err) {
        console.error('Auto-login after registration failed:', err);
        return res.redirect("/register?success=" + encodeURIComponent("Registration successful! Please login."));
      }
      console.log('User auto-logged in after registration:', user.email);
      return res.redirect("/");
    });
    
  } catch (err) {
    console.error('Registration error details:', err);
    
    if (err.code === '23505') { // PostgreSQL unique constraint error
      return res.redirect("/register?error=" + encodeURIComponent("User with this email already exists"));
    }
    
    return res.redirect("/register?error=" + encodeURIComponent("Registration failed. Please try again."));
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/login");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});