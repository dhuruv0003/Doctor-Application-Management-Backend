// This middlwware is used to catch and handle async errors in program

// 1. The catchAsyncError function is used to wrap the theFunction.
// 2. If any error occurs in theFunction, it will be caught by catchAsyncError and passed to the next error-handling middleware.
// 3.  It ensures that any errors occurring in theFunction are caught and passed to the next function, which will then invoke the error-handling middleware.

export const catchAsyncErrors = (theFunction) => {
   return function(req,res,next){
      theFunction(req,res,next).catch(err=>next(err))
   }
 };


