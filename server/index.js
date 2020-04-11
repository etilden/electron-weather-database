const passport = require('passport'); 
const db = require('./db')
const morgan = require('morgan')

// if (process.env.NODE_ENV === "test") {
//   after("close the session store", () => sessionStore.stopExpiringSessions());
// }

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user)
  } catch(err) {
    done(err)
  }
}); 

const createApp = () => {
  app.use(morgan("dev"))
  ;


}