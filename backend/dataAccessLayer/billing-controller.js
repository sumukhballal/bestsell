
const GetBills = (request,response) => {
    try {
        let query = `SELECT order_id as 'OrderId',
                    customer_id as 'CustomerId',
                    total_amount as 'TotalAmount',
                    s.name as 'StoreName',
                    created_on as 'Date',
                    O.status as 'OrderStatus',
                    O.store_id as 'StoreId'
                    from Orders O, store s
                    where O.store_id=s.store_id and O.customer_id=${request.query.customerID}`; // query database to get all the departments

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
