const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    // Send a JSON response using method JSON.stringify() containing the users array, formatted with an indentation of 4 spaces for readability
    res.send(JSON.stringify({users}, null, ));
});

//Exercise 3: Creating a GET by specific email method
// GET by specific ID request: Retrieve a single user with email ID using filter method
router.get("/:email",(req,res)=>{
    //Extract the email parameter from the request URL
    const email = req.params.email;
    //Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);
    //Send the filtered_users array as the respone 2 the client
    res.send(filtered_users);
});

//Practice 1. Getting users using a particula last name. Hint: Filter lastname from the users array
router.get("/lastName/:lastName", (req,res) => {
    const lastName = req.params.lastName;
    let filtered_lastname = users.filter((user) => user.lastName === lastName);
    res.send(filtered_lastname);
});

//Practice 2. Sorting users by DOB. Hint: Split the DOB & convert it to yyyy/mm/dd format and then sort it
//Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

//Define a route handler 4 GET requests to the "/sort" endpoint
router.get("/sort", (req,res) => {
    //Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a,b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1-d2;
    });
    //Send the sorted_users array as the response to the client
    console.log(sorted_users);
    res.send(sorted_users);
});

//Excercise 4: Creating the POST method
// POST request: Create a new user
router.post("/",(req,res)=>{
    // Push a new user object into the users array based on query parameters from the request. 
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added. 
    res.send("The user " + req.query.firstName + " has been added!");
});


//Exercise 5: Using PUT method in this case we are going to update the DOB of specific email ID
// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    //Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if(filtered_users.length > 0) {
        //Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];

        //Extract and update DOB if provided

        let DOB = req.query.DOB;
        if (DOB) {
            filtered_user.DOB = DOB;
        }

        let firstName = req.query.firstName;
        if (firstName) {
            filtered_user.firstName = firstName;
        }

        let lastName = req.query.lastName;
        if (lastName) {
            filtered_user.lastName = lastName;
        }

        //Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        //Send success msg indicating the user has been updated
        res.send(`User with the email ${email} updated!`)
    } else {
        //Send error msg if no user found
        res.send("Unable to find user😢")
    }
});


//Exercise 6: Creating the delete method
// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    //Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    //Send a success message as the response, indicating the user has been deleted
    res.send(`User with email ${email} deleted`);
});

module.exports=router;
