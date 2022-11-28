const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

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

    const token = await generateJWT(user.id, user.name);
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });  
  } catch (error) {
   console.log(error);
   res.status(500).json({
    ok: false,
    msg: 'Error saving, contact administrator.'
   });
  }
};

const loginUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: `E-mail and password are not correct.`
      });
    }

    // validate passwords
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password.'
      });
    }

    //todo generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });  

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error saving, contact administrator.'
    });
  }
  
  
};

const renewToken = async(req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  });
};

module.exports = { createUser, loginUser, renewToken };
