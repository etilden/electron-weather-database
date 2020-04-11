const router = require("express")
const Alert = require("../db/models")

router.get("/user/:userId", async (req, res, next) => {
  try {
    const userAlerts = await Alert.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userAlerts)
  } catch(err) {
    next(err)
  }
})

router.post("/user/:userId", async (req, res, next) => {
  try {
    const newAlert = await Alert.create(req.body)
    res.json(newAlert)
  } catch(err) {
    next(err)
  }
})

router.delete("/user/:userId/:alertId", async (req, res, next) => {
  try {
    const deleted = Alert.destroy({
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