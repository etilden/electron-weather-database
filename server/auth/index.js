const router = require('express').Router();
const { User, Sessions } = require('../db/models');


module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err =>
        err ? next(err) : res.json({ user, sessionId: req.sessionID })
        );
    }
  } catch (err) {
    next(err);
  }
});

router.post('/auto-login', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (error) {
    next(error)
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => err ? next(err) : res.json({ user, sessionId: req.sessionID }));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

router.get('/me', async (req, res, next) => {
  try {
    const returnAllFromSessions = await Sessions.findAll();
    const dataValuesOnly = returnAllFromSessions.map(item => item.dataValues);

    const sidAndUser = dataValuesOnly.map(entry => {
      const parsedData = JSON.parse(entry.data);
      return { sid: entry.sid, user: parsedData.passport.user };
    });

    res.send(sidAndUser);
  } catch (error) {
    next(error);
  }
});