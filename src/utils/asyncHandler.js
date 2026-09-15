
//      with promise then catch, try catch is below 
const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}



export {asyncHandler}


// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{()=>{}}
// const asyncHandler=(func)=> async ()=>{}   //we just remove the curly braces



//     with try catch 
// const asyncHandler=(fn)=>async(err,req,res,next)=>{
//     try {
//         await fn(err,req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:true,
//             message:error.message
//         })
//     }
// }
