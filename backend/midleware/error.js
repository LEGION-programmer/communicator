const StatusCodes = require('http-status-codes')

class GenerateNewError{
    statusCode
    constructor(message){
		this.statusCode = StatusCodes.BAD_REQUEST
        return {statusCode: this.statusCode, message: message}
    }
}

module.exports = GenerateNewError