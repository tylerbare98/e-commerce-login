/**
 * Get the error message
 */
exports.errorHandler = error => {
    let message = "";
 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                try {
                    //console.log("************************");
                    //console.log(error.message);
                    let email = error.keyValue.email;
                    message = (`"${email}" already exists`);
                } catch (ex) {
                    message = "Unique email already exists";
                }
                break;
            default:
                message = "Something went wrong";
        }
        
    } 
 
    return message;
};