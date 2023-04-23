const User = require('../models/user.model');

const emailValidator = async (email) => {
  
  const isExist = await User.find({ email });

  if (isExist.length !== 0) {
    throw new Error(`El email ${email} se encuentra en uso`);
  };
  return false;

};

module.exports = {
  emailValidator
}