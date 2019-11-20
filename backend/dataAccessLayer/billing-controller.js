
const GetBills = (request,response) => {
    try {
        let query = `SELECT * from Orders o`; // query database to get all the departments

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ error: error.message });
           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
} 

const bills = {
    GetBills
};

module.exports = bills;
