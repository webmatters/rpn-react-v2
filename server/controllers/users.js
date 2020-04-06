const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/dev')

exports.login = (req, res) => {
  const { email, password } = req.body

  if (!password || !email) {
    return res.sendApiError({
      title: 'Missing Data',
      detail: 'Email or password is missing!',
    })
  }

  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.mongoError(error)
    }

    if (!foundUser) {
      return res.sendApiError({
        title: 'Invalid Email',
        detail: 'No user found with this email.',
      })
    }

    if (foundUser.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          sub: foundUser.id,
          firstName: foundUser.firstName,
        },
        JWT_SECRET,
        { expiresIn: '2h' }
      )
      return res.json(token)
    } else {
      return res.sendApiError({
        title: 'Invalid Password',
        detail: 'Incorrect password provided',
      })
    }
  })
}

exports.register = (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
  } = req.body

  if (!password || !email) {
    return res.sendApiError({
      title: 'Missing Data',
      detail: 'Email or Password is missing',
    })
  }

  if (!firstName || !lastName) {
    return res.sendApiError({
      title: 'Missing Data',
      detail: 'First and Last Name are required.',
    })
  }

  if (password !== passwordConfirmation) {
    return res.sendApiError({
      title: 'Invalid Password',
      detail: 'Password and Password Confirmation must match',
    })
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.mongoError(error)
    }

    if (existingUser) {
      return res.sendApiError({
        title: 'Invalid Email',
        detail: 'A user with this email already exists.',
      })
    }

    const user = new User({ email, firstName, lastName, password })
    user.save(error => {
      if (error) {
        return res.mongoError(error)
      }

      return res.json({ status: 'registered' })
    })
  })
}

exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const decodedToken = parseToken(token)
    if (!decodedToken) {
      return notAuthorized(res)
    }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if (error) {
        return res.mongoError(error)
      }

      if (foundUser) {
        res.locals.user = foundUser
        next()
      } else {
        return notAuthorized(res)
      }
    })
  } else {
    return notAuthorized(res)
  }
}

function parseToken(token) {
  try {
    return jwt.verify(token.split(' ')[1], JWT_SECRET)
  } catch (error) {
    return null
  }
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: 'Not Authorized!',
        detail: 'You must log in to get access.',
      },
    ],
  })
}
