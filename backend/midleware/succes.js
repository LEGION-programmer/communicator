const StatusCodes = require('http-status-codes')

class GenerateSuccesResponse{
    statusCode
    constructor(data){
		this.statusCode = StatusCodes.OK
        return {statusCode: this.statusCode, data: data}
    }
}

module.exports = GenerateSuccesResponse