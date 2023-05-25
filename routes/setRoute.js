const express = require("express");
const router = express.Router();

const itemController = require("../controller/Item");

router
    .route("/items")
    .post((req, res) => itemController.create( req, res ));
    
router
    .route("/items/:hesh")
    .get((req, res) => itemController.getAll(req, res));

router
    .route("/items/:hesh/:chave")
    .get((req, res) => itemController.get(req, res))

router.delete("/items/:id", itemController.delete);

router
    .route("/items/:hash/:chave")
    .put((req, res) => itemController.update(req, res));

module.exports = router;
