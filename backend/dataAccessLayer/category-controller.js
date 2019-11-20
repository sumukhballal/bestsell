
const GetCategories = (request, response) => {
    try {
        let query = `SELECT 
                        A.category_id AS 'CategoryId',
                        A.name AS 'Name',
                        A.description AS 'Description' 
                    FROM category A `; // query database to get all the departments

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ error: error.message });
           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
} 

const category = {
    GetCategories
};

module.exports = category;