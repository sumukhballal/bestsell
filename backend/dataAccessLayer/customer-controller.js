const  firebase = require("firebase/app");
const auth = require("firebase/auth");

var firebaseConfig = {
    apiKey: "AIzaSyAk741kJDwAj05jdQdRrIRNBJHV-khavok",
    authDomain: "bestsell-ecommerce.firebaseapp.com",
    databaseURL: "https://bestsell-ecommerce.firebaseio.com",
    projectId: "bestsell-ecommerce",
    storageBucket: "bestsell-ecommerce.appspot.com",
    messagingSenderId: "18924701607",
    appId: "1:18924701607:web:d3c58be5647fd6b8a61882"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const RegisterCustomer = (request, response) => {
    try {

        let params = request.body;

        firebase.auth()
                .createUserWithEmailAndPassword(params.Email, params.Password)
                .then(function(res){
                    let query = `INSERT INTO customer
                    (address_1, address_2, city, country, day_phone, email, eve_phone, mob_phone, fname,lname, postal_code, region, shipping_region_id)
                    values
                    (
                        '${params.AddressOne}', 
                        '${params.AddressTwo}', 
                        '${params.Town}', 
                        '${params.Country}',  
                        '', 
                        '${params.Email}', 
                        '', 
                        '${params.Mobile}', 
                        '${params.FirstName}',
                        '${params.LastName}',
                        '${params.ZipCode}', 
                        '',
                        ${params.RegionId});`; // query database to get all the  Shipping Regions
            
                    // execute query
                    db.query(query, (err, result) => {
                       if (err != null) response.status(500).send({ error: err.message });
            
                       return response.json(true);
                   });
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return response.status(500).send({ error: error.message });
                    // ...
                });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

// validate login details and sign in
const AuthenticateLogin = (request, response) => {
    try {
        let params = request.body;
        SignInRegular(params.Username, params.Password)
            .then((res) => {
                let query = `SELECT 
                    A.email AS 'Email',
                    A.address_1 AS 'AddressOne',
                    A.address_2 AS 'AddressTwo',
                    A.city AS 'Town',
                    A.country AS 'Country',
                    A.customer_id AS 'CustomerId',
                    A.mob_phone AS 'Mobile',
                    A.fname AS 'FullName',
                    A.lname AS 'LastName',
                    A.fname AS 'FirstName',
                    A.postal_code AS 'ZipCode',
                    A.shipping_region_id AS 'RegionId'
                    FROM  customer A
                    WHERE A.email = '${params.Username}';`; // query database to get all the  Shipping Regions

                // execute query
                db.query(query, (err, result) => {
                    if (err != null) response.status(500).send({ error: err.message });
                    return response.json(result);
                });
            })
            .catch((error) => {
                return response.status(500).send({ error: error.message });
            });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const Logout = (request, response) => {
    try {
        firebase.auth().signOut().then(res => {
            return response.json(res);
        })
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

// sign in using firebase authentication
const SignInRegular = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}


const UpdateCustomer = (request,response) =>
{
    let params = request.body;
    console.log(params.AddressOne)
try {
    let query=`update customer c
    set c.address_1="${params.AddressOne}", 
    c.address_2="${params.AddressTwo}",
    c.city="${params.Town}",
    c.postal_code="${params.ZipCode}",
    c.country="${params.Country}",
    c.mob_phone="${params.Mobile}"    
    where c.customer_id=${params.CustomerId};`

    console.log(query)
    db.query(query,(err,result) => {
        if(err!=null) response.status(500).send({ error: err.message });

        return response.json(result)
    })
}
catch(err)
{
    if(err!=null) 
    response.status(500).send({ error: err.message });
}
}

const customer = {
    RegisterCustomer,
    AuthenticateLogin,
    UpdateCustomer,
    Logout
};

module.exports = customer;