module.exports = {
    Response(res,status,message,data){
        const response = {
            status,
            message,
            data
        }
        return res.status(status).json(response)
    }
}