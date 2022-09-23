const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation, upload } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/current/:subscription",
  auth,
  validation(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;
