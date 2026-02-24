const { body } = require("express-validator");

exports.categoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Nama category wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
];