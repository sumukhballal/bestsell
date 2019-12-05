const GetStores = (request, response) => {
    let query =`select 
    s.store_id as 'StoreId',
    s.name as 'StoreName',
    s.address as 'StoreAddress',
    s.city as 'StoreCity'
    from store s`

    db.query(query,(err,result) => {
        if (err != null) response.status(500).send({ err: err.message });

        return response.json(result)
    })
};

const stores = {
    GetStores
};

module.exports = stores; 