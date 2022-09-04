const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please, set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Please, set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Please, set phone for contact"],
      match: [phoneRegexp, "Must be in format (000) 000-0000"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(phoneRegexp, "numbers").required(),
  favorite: Joi.boolean().default(false),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("Missing field favorite")),
});

const schemas = {
  add: addSchema,
  updateStatus: updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
