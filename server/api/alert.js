const router = require("express").Router();
const { WeatherAlert, User } = require("../db/models")

router.get("/user/:userId", async (req, res, next) => {
  try {
    const userAlerts = await WeatherAlert.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{
        model: User
      }]
    })
    res.json(userAlerts)
  } catch(err) {
    next(err)
  }
})

router.post("/user/:userId", async (req, res, next) => {
  try {
    const newAlert = await WeatherAlert.create(req.body)
    res.json(newAlert)
  } catch(err) {
    next(err)
  }
})

router.delete("/user/:userId/:alertId", async (req, res, next) => {
  try {
    const deleted = WeatherAlert.destroy({
      where: {
        id: req.params.alertId
      }
    })
    res.json(deleted)
  } catch(err) {
    next(err)
  }
})

module.exports = router