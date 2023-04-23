const {
  obtenerTodosLosUsuarios,
  obtenerUsuariosPorId,
  crearUsuarios,
  editarUsuarios,
  eliminarUsuarios,
} = require("../services/user.services");
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");



const getAllUsers = async (req, res) => {
  try {
    const resp = await obtenerTodosLosUsuarios();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await obtenerUsuariosPorId(id);
    if (!resp) {
      res.status(404).json('Usuario no encontra2');
      return
    }
    res.status(200).json(resp)
  } catch (error) {}
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userData = req.body;
    const saltRound = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, saltRound);
    

    console.log(userData);
    const resp = await crearUsuarios(userData);
    res.status(200).json('Usuario creado con éxito');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const resp = await editarUsuarios(id, userData);
     if (!resp) {
       res.status(404).json("Usuario no encontra2");
       return;
     }
     res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message)
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await eliminarUsuarios(id);
    if (!resp) {
      res.status(404).json("Usuario no encontra2");
      return;
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
};

const disableUser = async (req, res) => {
  //Borrado lógico
 try {
   const { id } = req.params;
   const disabledTrue = { disabled: true };
    const resp = await editarUsuarios(id, disabledTrue);
    if (!resp) {
      res.status(404).json("Usuario no encontra2");
      return;
    }
    res.status(200).json(resp);
 } catch (error) {
    res.status(500).json(error);
  
 }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  disableUser
};
