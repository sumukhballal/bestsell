const GetAllProductQuantity = (request,response) => {

    storeId=request.query.StoreId
    let query = `select s.name as 'StoreName',
    p.name as 'ProductName',
    b.name as 'BrandName',
    c.name as 'CategoryName',
    i.current_quantity as 'CurrentQuantity' 
    from 
    inventory i,product p,store s,brand b,product_category pc,category c 
    where s.store_id=i.store_id and i.product_id=p.product_id
    and p.brand_id=b.brand_id and pc.category_id=c.category_id and pc.product_id=p.product_id and
    s.store_id=${storeId};
    `

    try{
        db.query(query,(error,result) => 
        {
            if (error != null) response.status(500).send({ error: error.message });

            return response.json(result)
        })
    }
    catch(error)
    {
        if (error != null) response.status(500).send({ error: error.message });
    }

}

const inventory = {
    GetAllProductQuantity
}

module.exports = inventory