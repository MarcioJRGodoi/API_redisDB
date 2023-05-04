const router = require("express").Router();

const itemsRouter = require("./setRoute");

router.use("/", itemsRouter);

module.exports = router;