
const GetDepartments = (request, response) => {
    try {
        let query = `SELECT 
                        B.brand_id AS 'BrandID',
                        B.name AS 'Name',
                        B.email AS 'Email',
                        B.description AS 'Description' 
                    FROM brand B 
                    ORDER BY brand_id ASC`; // query database to get all the departments

        // execute query
        db.query(query, (err, result) => {
            console.log(2)
            if (err != null) response.status(500).send({ error: error.message });

            return response.json(result);
       });
    } catch (error) {
        console.log(2)
        if (error != null) response.status(500).send({ error: error.message });
    }
}

const departments = {
    GetDepartments
}

module.exports = departments;