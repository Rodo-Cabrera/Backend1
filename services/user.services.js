const User = require('../models/user.model')


const obtenerTodosLosUsuarios = async () => {
  // return await User.find({ disabled: false }) para traer solo los usuarios activos 
  return await User.find({});
  
 
}


const obtenerUsuariosPorId = async (id) => {
  return await User.findById(id);
};

const crearUsuarios = async (userData) => {
  // const newUser = new User({
    // name: user.name,
    // lastName: user.lastName,
    // age: user.age
  // }); 

  // const newUser = new User(user);
  // return await newUser.save();
  const newUser = new User(userData);
  return await newUser.save();
};

const editarUsuarios = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData);
};

const eliminarUsuarios = async (id) => {
  return await User.findByIdAndDelete(id);
};


module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUsuariosPorId,
  crearUsuarios,
  editarUsuarios,
  eliminarUsuarios
}