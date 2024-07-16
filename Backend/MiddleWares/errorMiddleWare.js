

//class in js=>
//Eg=> 
// class Vehicle {
//     constructor(name, engine) {
//         this.name = name;
//         this.engine = engine;
//     }
// }  
 
//  Use the "super" method to call the parent's constructor function Error(message) it is used to throw error.
 // Using super() method in constructor, we can call the parent i.e Error Class constructor method and access message properties which is already defined in it

class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}
// When an instance of ErrorHandler is created, it calls the constructor of the Error class with the message parameter using super(message), and then it sets an additional property statusCode.
  
  export const errorMiddleware = (err, req, res, next) => {

    // default values for err.message and statuscode 
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    // Duplicate Key Error (MongoDB)
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`,
        err = new ErrorHandler(message, 400);
    }
  
    console.log(err.message);
    // err is an object, with nested object errors, where all the errors are stored, i.e firstname error, lastname, phome,email, message, etc, which themseves are object, but we need only values of these errors object


    // a. Object.values(err.errors): This creates an array of all the values in the err.errors 
    // .map((error) => error.message): This maps over each error in the array, extracting the message property from each error object.
    // c. .join(" "): This joins all the error messages into a single string, with spaces between each message.

    const errorMessage= err.errors ?
     Object.values(err.errors).map(error=>error.message).join(', ') : err.message

    return res.status(err.statusCode).json({
      success: false,
      // message: err.message,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;