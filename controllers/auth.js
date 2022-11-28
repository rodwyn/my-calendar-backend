const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `E-mail ${ email } has already been registered.`
      });
    }

    user = new User(req.body);
    // encrypt Password 
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    await user.save();
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    });  
  } catch (error) {
   console.log(error); 
   res.status(500).json({
    ok: false,
    msg: 'Error saving, contact administrator.'
   });
  }
};

const loginUser = (req, res = response) => {
  const { name, email, password } = req.body;
  
  res.status(201).json({
    ok: true,
    msg: 'login',
    name,
    email,
    password
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  });
};

module.exports = { createUser, loginUser, renewToken };
