const asyncHandler = (fn) => {
    return async (req, res, next) => {
            try {
                await fn(req, res, next) ;
            } catch (error) {
                console.log("🔴 Async Handler Error:",error);
                
                res.status(error.statusCode || 500).json({
                    message: error.message,
                    status: error.code || 500,
                    success: false
                })
            }
        }
}

export {asyncHandler}