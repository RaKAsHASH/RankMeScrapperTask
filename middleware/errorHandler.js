export const HandleErrors = (func) =>{
    return async(req,res,next) => {
        try {
            await func(req,res,next)
        } catch (err){
            console.log('Some Error Occured: ',err)
            next(err)
        }
    }
}