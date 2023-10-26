const express = require('express')
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

var auth = function async (req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
       throw new UnauthenticatedError('User not authorized')
    }

    token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.decode(token,process.env.JWT_SECRET)
        req.jwtInfo = {userId: decoded.userId,name:decoded.name}
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    next();
  };

  module.exports = auth