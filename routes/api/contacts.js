const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, isValidId, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getListContacts));

router.get("/:id", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(schemas.add), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  auth,
  isValidId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validation(schemas.updateStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", auth, isValidId, ctrlWrapper(ctrl.removeContactById));

module.exports = router;
