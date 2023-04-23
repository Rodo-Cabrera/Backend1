const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const searchUser = await User.findOne({ email });
  
    if (searchUser) {
      const match = await bcrypt.compareSync(password, searchUser.password)
      console.log(match);

      const payload = {
        id: searchUser._id,
        email: searchUser.email,
        role: 'admin'
      };

      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1200,
      })
      res.status(200).json({ msg: 'login exitoso', token });
    } else {
      res.status(404).json('Usuario no registrado')
    }   
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  login
}