const router = require("express").Router(); 
const { User, WeatherAlert } = require('../db/models'); 

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        userName: req.body.userName
      }
    })
    console.log(user)
    if (!user.length) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user[0].correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      res.json(user)
    }
  } catch(err) {
    next(err)
  }
})

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: {
        model: WeatherAlert
      }
    });
    res.json(user)
  } catch(err) {
    next(err)
  }
})

router.put("/:userId", async (req, res, next) => {
  try {
    const user = User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch(err) {
    next(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    let user = User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.json(user)
  } catch(err) {
    next(err)
  }
})

module.exports = router