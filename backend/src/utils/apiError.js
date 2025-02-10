class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = []
    ){
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.message = message
        this.success = false
        this.data = null
    }
}

export {ApiError}