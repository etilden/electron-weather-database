const router = require("express");
const City = require("../db/models");

router.get('/:cityId', async (req, res, next) => {
  try {
    let city = await City.findByPk(req.params.cityId);
    res.json(city)
  } catch(err) {
    next(err)
  }
})

module.exports = router