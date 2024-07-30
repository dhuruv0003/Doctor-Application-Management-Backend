import ErrorHandler from "./ErrorHandler";

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


// When an instance of ErrorHandler is created, it calls the constructor of the Error class with the message parameter using super(message), and then it sets an additional property statusCode.
  
  export const errorMiddleware = (err, req, res, next) => {

    // default values for err.message and statuscode 
    const {message="Internal Server Error",status=500}=err;
  
    // Duplicate Key Error (MongoDB)
    if (err.code === 11000) {
      const newMessage = `Duplicate ${Object.keys(err.keyValue)} Entered`,
        err = new ErrorHandler(newMessage, 400);
    }
    if (err.name === "JsonWebTokenError") {
      const newMessage = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(newMessage, 400);
    }
    if (err.name === "TokenExpiredError") {
      const newMessage = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(newMessage, 400);
    }
    if (err.name === "CastError") {
      const newMessage = `Invalid ${err.path}`,
        err = new ErrorHandler(newMessage, 400);
    }
  
    console.log(message);
    // err is an object, with nested object errors, where all the errors are stored, i.e firstname error, lastname, phome,email, message, etc, which themseves are object, but we need only values of these errors object


    // a. Object.values(err.errors): This creates an array of all the values in the err.errors 
    // .map((error) => error.message): This maps over each error in the array, extracting the message property from each error object.
    // c. .join(" "): This joins all the error messages into a single string, with spaces between each message.

        // "err": {
    //     "errors": {
    //         "email": {
    //             "name": "ValidatorError",
    //             "message": "Please provide correct email",
    //             "properties": {
    //                 "message": "Please provide correct email",
    //                 "type": "user defined",
    //                 "path": "email",
    //                 "value": "dhruvdk02gmailcom"
    //             },
    //             "kind": "user defined",
    //             "path": "email",
    //             "value": "dhruvdk02gmailcom"
    //         }
    //     },

    const errorMessage= err.errors ? Object.values(err.errors).map(error=>error.message).join(', ') : message

    return res.status(err.statusCode).json({
      success: false,
      // message: message,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;