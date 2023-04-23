const { Router } = require("express");
const route = Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  disableUser,
} = require("../controllers/user.controllers");
const { body } = require("express-validator");
const {emailValidator} = require('../helpers/validations');
const { jwtValidator } = require("../middlewares/jwtValidation");

route.get("/get-users", jwtValidator, getAllUsers);

route.get("/get-user-by-id/:id", getUserById);

route.post(
  "/create-user",
  body("email")
    .isEmail()
    .withMessage("El formato de Email no es válido")
    .not()
    .isEmpty()
    .withMessage("El campo está vacío")
    .custom(emailValidator),
  body('password').matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).withMessage('La contraseña no cumple con los requisitos'),
  createUser
);

route.patch("/edit-user/:id", editUser);

route.delete("/delete-user/:id", deleteUser);

route.patch("/disable-user/:id", disableUser);

module.exports = route;
