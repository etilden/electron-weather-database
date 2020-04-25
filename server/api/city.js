const router = require("express").Router();
const { City } = require("../db/models");

router.get('/', async (req, res, next) => {
  try {
    let citiesArr = await City.findAll()
    res.json(citiesArr)
  } catch(err) {
    next(err)
  }
})

router.get('/:cityId', async (req, res, next) => {
  try {
    let city = await City.findByPk(req.params.cityId);
    res.json(city)
  } catch(err) {
    next(err)
  }
})

module.exports = router