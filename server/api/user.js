const router = require("express"); 
const User = require('../db/models'); 

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
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