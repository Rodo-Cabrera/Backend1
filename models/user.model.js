const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: [true, 'Este campo es requerido, papi']
  },
  age: {
    type: Number,
    min: [1, 'La edad mínima es de 1 año'],
    max: [100, 'la edad máxima es de 100 años'],
    required: [true, 'Y diai? cuántos años tenes?']
  },  
    email: {
      type: String,
      required: true
  },
  password: {
    type: String,
    required: true
   },
    
  disabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'client'
  }
});


module.exports = model('user', userSchema)