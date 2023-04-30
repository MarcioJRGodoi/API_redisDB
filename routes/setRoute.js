const express = require("express");
const router = express.Router();

const itemController = require("../controller/index");

router
    .route("/items")
    .post((req, res) => itemController.create( req, res ));
    
router.get("/items", itemController.getAll);
router.get("/items/:id", itemController.get);
router.delete("/items/:id", itemController.delete);
router.put("/items/:id", itemController.update);

module.exports = router;
