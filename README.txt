#How to Run
npm install
npm start





#The Assignment
Write a long-lived service in JavaScript/NodeJS, that:
"Listens on port 9000 for incoming HTTP connections (use any library you'd like)" 

I'm most comfortable with setting up express as a backend, and its a common enough library 
that other contributors can easily help with the project as it matures.

"in non-blocking fashion."

Node by nature is event based, meaning our program should have asynchronous (non-blocking)
behavior by default.

My understanding is that the ask is to create 2 routes.
/input takes a POST with string in the body.
/query accepts a GET with a key param.

We'll create a frequency map using a Map to ensure unique keys.
/input will give us a string,   if that string exists in the Map we increment the value at that location
                                if not we add it to the Map and initialize its value to one.

the key from /query will be used to get the value in the Map (with O(1) lookup)
    if key does not exist in Map, return 0
    else return value at key


Update: I'm wondering about the wording "long-lived service". I thinking the data should be persistent
    I haven't used it before but sqlite might be a good idea for such a small project since it would
    be easy for others to use since it will live in a sqlite file in the repo.


To Test:
    We'll need a function that can hit this endpoint,
    maybe use a really light library to test that the values returning are correct. 
    (might not be necessary)



STEPS:
    -installed and imported express.js
    -set up a get, post, and listen 
    -got server listening on port 9000
    -added nodemon as dev dependency to streamline development with hot reload
    -added "dev" script to run index with nodemon instead 
    -Was able to GET the query endpoint using the browser
    -Built a fetch function in a new file to POST the input endpoint
    -Allowed new function to pass a simple string in POST as body
    -Accessed the string in body by adding app.use(express.text())
    -Implemented a frequncy map using the Map class in JS.
    -added logic for incrementing count on freqency map if the key already exists
    -imported jest, added test script to package.json
    -made some simple tests to confirm that API works as intended