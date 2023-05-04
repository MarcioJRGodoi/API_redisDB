const express = require("express");
const router = express.Router();

const itemController = require("../controller/Item");

router
    .route("/items")
    .post((req, res) => itemController.create( req, res ));
    
router
    .route("/items")
    .get((req, res) => itemController.getAll(req, res));

router
    .route("/items/:chave")
    .get((req, res) => itemController.get(req, res))

router.delete("/items/:id", itemController.delete);
router.put("/items/:id", itemController.update);

module.exports = router;
