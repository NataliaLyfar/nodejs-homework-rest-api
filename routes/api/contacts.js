const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");


router.get("/", ctrlWrapper(ctrl.getListContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validation(schemas.add), ctrlWrapper(ctrl.updateContactById));

router.patch("/:id/favorite", isValidId, validation(schemas.updateStatus), ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContactById));

module.exports = router;
