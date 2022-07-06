# starting e-commerce-store
Run app with "npx nodemon server.js" ----use "pkill node" if doesn't work

# setting up DB
MongoDB Atlas connected through using mongoose
.env file used for storing process.env.**** variables.

# routes/controller folder
routes: lets you create a fodler of different routes to keep server file cleaner. 
controllers:lets you define functions for individual routes to executs to keep routes files clean

# Postman / Thunder client
if you get a 401 error, gitpod has a cookie then needs to be set

# Hashing / encryption / salt
Hashing is one way, encryption is two way. Encryption is meant to hide the data and later be decrypted(two way)(using keys). Hashing is meant to authenticate a user in a DB or to authenticate that a file has not been altered. If the file was altered a different hash would be produce so you would know. You can't reverse a hash, but you can re hash a password to see if the new hash eqauls teh stored hash. Adding salt makes a brute force attack harder, but it useless if the hacker knows the salt.
https://www.thesslstore.com/blog/difference-encryption-hashing-salting/#:~:text=Encryption%20is%20a%20two%2Dway%20function%20where%20information%20is%20scrambled,is%20primarily%20used%20for%20authentication.