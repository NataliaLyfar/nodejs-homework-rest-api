const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { validationBody } = require("../../middlewares/validation");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");

router.post(
  "/register",
  validationBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validationBody(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/current/:subscription",
  auth,
  validationBody(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
