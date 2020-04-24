const passport = require('passport'); 
const db = require('./db');
const morgan = require('morgan');
const cors = require("cors");
const express = require("express")
const compression = require("compression");
const path = require("path"); 
const session = require('express-session'); 
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 8080;
const sessionStore = new SequelizeStore({db});

const app = express(); 

//Only use if running tests
// if (process.env.NODE_ENV === "test") {
//   after("close the session store", () => sessionStore.stopExpiringSessions());
// }

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user)
  } catch(err) {
    done(err)
  }
}); 

const createApp = () => {
  app.use(morgan("dev"));

  app.use(cors()); 

  app.use(express.json()); 
  app.use(express.urlencoded({extended: true}))

  app.use(compression());

  app.use(express.static(path.join(__dirname, "..", "public")));

  //session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "my best friend is Cody",
      store: sessionStore,
      name: 'user_session',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: (24 * 60 * 60 * 1000)
      }
    })
  )

  app.use(passport.initialize()); 
  app.use(passport.session());

  app.use('/auth', require("./auth")); 
  app.use('/api', require('./api')); 

  //For requests with extensions
  // app.use((req, res, next) => {
  //   if (path.extname(req.path).length) {
  //     const err = new Error("not found"); 
  //     err.status = 404; 
  //     next(err)
  //   } else {
  //     next()
  //   }
  // })

  // sends index.html
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

const syncDb = () => db.sync();

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}