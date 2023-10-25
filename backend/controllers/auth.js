const {
	StatusCodes
} = require('http-status-codes')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {
	BadRequestError,
	UnauthenticatedError
} = require('../errors')



const register = async (req, res) => {
	const user = await User.create(req.body)
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name
		},
		token
	})
}

const login = async (req, res) => {
	const {
		email,
		password
	} = req.body

	if (!email) {
		throw new BadRequestError('Must provide Email ')
	}
	if (!password) {
		throw new BadRequestError('Must provide Password')
	}

	const user = await User.findOne({
		email
	})

	if (!user) {
		throw new BadRequestError('Invalid Email')
	}

	const comparePassword = async (passwordToCompare) => {
		const match = await bcrypt.compare(passwordToCompare, user.password)
		return match
	}


	const isValid = await comparePassword(password)

	if (!isValid) {
		throw new BadRequestError('Senha Incorreta')
	}



	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name
		},
		token
	})

}

module.exports = {
	register,
	login
}