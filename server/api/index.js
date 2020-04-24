const router = require("express").Router(); 

router.use("/user", require("./user"));
router.use("/city", require("./city")); 
router.use("/alert", require("./alert"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router