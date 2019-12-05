
/*const GetProducts = (request, response) => {
    try {
        let query = `SELECT TOP 10
                            P.product_id AS 'ProductId',
                            P.name AS 'Name',
                            P.description AS 'Description',
                            P.price AS 'Price',
                            P.discounted_price AS 'DescountedPrice',
                            P.image AS 'PrimaryImage',
                            P.image_2 AS 'SecondaryImage',
                            P.thumbnail AS 'Thumbnail',
                            P.display AS 'Display',
                            P.category_id AS 'CategoryId',
                            P.department_id AS 'DepartmentId'
                    FROM product P, category C, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id;`; // query database to get all the departments'

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                    FROM 
                        product P, 
                        category C, 
                        department D, 
                        product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND C.department_id = D.department_id
                    ${filterDepartment} ${filterCategory};`;

        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
            }

            let resultSet = {
                Products: result[0], 
                ProductCount: result[1]
            }
            // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                 productIdList.push(element.ProductId);
            });

            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'AttributeName',
                A.attribute_id AS 'AttributeId',
                AV.attribute_value_id AS 'AttributeValueId',
                AV.value AS 'AttributeValue',
                PA.product_id AS 'ProductId'
            FROM attribute_value AV
            INNER JOIN attribute A
                    ON AV.attribute_id = A.attribute_id
            INNER JOIN product_attribute PA
                    ON PA.attribute_value_id = AV.attribute_value_id
            WHERE AV.attribute_value_id IN
                    (SELECT attribute_value_id
                    FROM   product_attribute
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['Size'] = aaa.filter(a => a.AttributeId == 1);
                    resultSet.Products[index]['Color'] = aaa.filter(a => a.AttributeId == 2);
                });
                return response.json(resultSet);
            });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};
*/

const GetProducts = (request,response) =>{
    try{
        let query=`SELECT 
        P.product_id AS 'ProductId',
        P.name AS 'Name',
        C.category_id as 'CategoryId',
        C.name as 'CategoryName',
        B.brand_id as 'BrandID',
        B.name as 'BrandName',
        P.description AS 'Description',
        P.price AS 'Price',
        P.discounted_price AS 'DescountedPrice',
        P.image AS 'PrimaryImage',
        P.image_2 AS 'SecondaryImage',
        P.thumbnail AS 'Thumbnail',
        P.display AS 'Display'
        from Product P,Product_Category PC, Category C, Brand B
        WHERE P.product_id = PC.product_id 
        AND C.category_id = PC.category_id
        AND P.brand_id=B.brand_id`;
        db.query(query,(err,result) => {
            return response.json(result);
        });
    }
    catch(err)
    {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
}
const GetProductAttributes = (request, response) => {
    try {
        let query = 'CALL catalog_get_attribute_values(1);CALL catalog_get_attribute_values(2)'
        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
               }
            return response.json({Size: result[0], Color: result[1]});
        });
    } catch (error) {
        
    }
};
/*
const GetFilteredProducts = (request, response) => {
    try {
        let filterDepartment = (request.body.paging.BrandID == 0) ? '' : `AND B.brand_id = ${request.body.paging.BrandID}`;
        let filterCategory = (request.body.paging.CategoryId == 0) ? '' : `AND C.category_id = ${request.body.paging.CategoryId}`;
        let filterSearchString = ''; 
        request.body.paging.SearchString = (request.body.paging.SearchString == undefined) ? '': request.body.paging.SearchString;
        
        if(request.body.paging.SearchString == ''){
            filterSearchString = `P.name like '%%' OR P.description like '%%'`;
        } else if(request.body.paging.IsAllWords) {
            let words = request.body.paging.SearchString.split(' ');
            let likeQuery = [];
            words.forEach(element => {
                likeQuery.push(`P.name like '%${element}%' OR P.description like '%${element}%'`);
            });
            filterSearchString = likeQuery.join(' OR ');
        } else{
            filterSearchString = `P.name like '%${request.body.paging.SearchString}%' 
                                 OR P.description like '%${request.body.paging.SearchString}%'`;
        }
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display',
                        C.category_id AS 'CategoryId',
                        C.department_id AS 'DepartmentId',
                        B.name AS 'DepartnmentName',
                        C.name AS 'CategoryName'
                    FROM product P, category C, brand B, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND P.brand_id=B.brand_id
                        ${filterDepartment} 
                        ${filterCategory}
                        AND (${filterSearchString})
                    LIMIT ${request.body.paging.PageNumber}, ${request.body.paging.PageSize};`; // query database to get all the departments

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                                FROM product P, category C, brand B, product_category PC
                                WHERE P.product_id = PC.product_id 
                                    AND C.category_id = PC.category_id
                                    AND C.department_id = D.department_id
                                    ${filterDepartment} ${filterCategory}
                                    AND (${filterSearchString});`; // query database to get related product count
        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
           if (err != null){
            return response.status(500).send({ error: err.message });
           }
            let resultSet = {
               Products: result[0], 
               ProductCount: result[1]
            }
            if(resultSet.Products.length == 0){
                return response.json(resultSet);
            }
           // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                productIdList.push(element.ProductId);
            });
            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'AttributeName',
                A.attribute_id AS 'AttributeId',
                AV.attribute_value_id AS 'AttributeValueId',
                AV.value AS 'AttributeValue',
                PA.product_id AS 'ProductId'
            FROM attribute_value AV
            INNER JOIN attribute A
                    ON AV.attribute_id = A.attribute_id
            INNER JOIN product_attribute PA
                    ON PA.attribute_value_id = AV.attribute_value_id
            WHERE AV.attribute_value_id IN
                    (SELECT attribute_value_id
                    FROM   product_attribute
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['Size'] = aaa.filter(a => a.AttributeId == 1).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                    resultSet.Products[index]['Color'] = aaa.filter(a => a.AttributeId == 2).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                });
                return response.json(resultSet);
            });

       });
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
};*/

const GetFilteredProducts = (request, response) => {
    try {
        let filterDepartment = (request.body.paging.BrandID == 0) ? `` : `AND B.brand_id = ${request.body.paging.BrandID}`;
        let filterCategory = (request.body.paging.CategoryId == 0) ? `` : `AND C.category_id = ${request.body.paging.CategoryId}`;
        let filterSearchString = ''; 
        request.body.paging.SearchString = (request.body.paging.SearchString == undefined) ? '': request.body.paging.SearchString;
        
        if(request.body.paging.SearchString == ''){
            filterSearchString = `P.name like '%%' OR P.description like '%%'`;
        } else if(request.body.paging.IsAllWords) {
            let words = request.body.paging.SearchString.split(' ');
            let likeQuery = [];
            words.forEach(element => {
                likeQuery.push(`P.name like '%${element}%' OR P.description like '%${element}%'`);
            });
            filterSearchString = likeQuery.join(' OR ');
        } else{
            filterSearchString = `P.name like '%${request.body.paging.SearchString}%' 
                                 OR P.description like '%${request.body.paging.SearchString}%'`;
        }

        //let CategoryString=`AND C.category_id=${request.body.paging.CategoryId}`
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        B.name as 'BrandName',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display',
                        C.category_id AS 'CategoryId',
                        C.name AS 'CategoryName',
                        P.brand_id AS 'BrandID'
                    FROM product P, category C, brand B, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND P.brand_id=B.brand_id
                        ${filterDepartment}
                        ${filterCategory};`;
                        
                        //AND C.category_id=${request.body.paging.CategoryId};`; // query database to get all the departments

                       // ${filterDepartment} 
                       // ${filterCategory}
                    // LIMIT ${request.body.paging.PageNumber}, ${request.body.paging.PageSize};
                    //AND (${filterSearchString}) Add to the above query
        /*let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                                FROM product P, category C, brand B, product_category PC
                                WHERE P.product_id = PC.product_id 
                                    AND C.category_id = PC.category_id
                                    AND C.department_id = D.department_id
                                    ${filterDepartment} ${filterCategory}
                                    AND (${filterSearchString});`; // query database to get related product count
        // execute query */
        db.query(query,(err,result) => {
           return response.json(result);
        });
        
       /* db.query(query + productCountQuery, [1, 2], (err, result) => {
           if (err != null){
            return response.status(500).send({ error: err.message });
           }
            let resultSet = {
               Products: result[0], 
               ProductCount: result[1]
            }
            if(resultSet.Products.length == 0){
                return response.json(resultSet);
            }
           // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                productIdList.push(element.ProductId);
            });
            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'AttributeName',
                A.attribute_id AS 'AttributeId',
                AV.attribute_value_id AS 'AttributeValueId',
                AV.value AS 'AttributeValue',
                PA.product_id AS 'ProductId'
            FROM attribute_value AV
            INNER JOIN attribute A
                    ON AV.attribute_id = A.attribute_id
            INNER JOIN product_attribute PA
                    ON PA.attribute_value_id = AV.attribute_value_id
            WHERE AV.attribute_value_id IN
                    (SELECT attribute_value_id
                    FROM   product_attribute
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['Size'] = aaa.filter(a => a.AttributeId == 1).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                    resultSet.Products[index]['Color'] = aaa.filter(a => a.AttributeId == 2).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                });
                return response.json(resultSet);
            });

       });*/
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
};

// http://localhost:8080/api/product/getProductDetails?productId=1
const GetProductDetailsById = (request, response) => {
    try {
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        B.name AS 'BrandName',
                        C.name AS 'CategoryName',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display'
                    FROM 
                        product P, 
                        brand B,
                        product_category PC,
                        category C
                        where
                        B.brand_id=P.brand_id and
                        PC.product_id=P.product_id and
                        P.product_id = ${request.query.productId}`; // query database to get all the departments

        // execute query
        db.query(query ,(err, result) => {
            return response.json(result[0])
        });
    }
    catch(err)
    {
        return response.status(500).send({err:err.message});
};
}

//http://localhost:8080/api/product/getProductDetailsForOrder?customerID=1&orderID=8
const GetProductByOrderId = (request,response) => {
try{
    let query=`select o.order_id as "OrderID",
    p.product_id as"ProductId",
    p.name as "ProductName",
    od.quantity as "Quantity",
    p.price as "Price",
    b.name as "BrandName",
    c.name  as "CategoryName",
    o.status as "OrderStatus"
    from product p,product_category pc,orders o,order_detail od,brand b,category c 
    where o.order_id=od.order_id 
    and p.product_id=od.product_id 
    and b.brand_id=p.brand_id 
    and c.category_id=pc.category_id 
    and pc.product_id=p.product_id 
    and o.customer_id=${request.query.customerID} and o.order_id=${request.query.orderID};`

    db.query(query,(error,result) => {
        if(error!=null) return response.status(500).send({error: error.message})

        return response.json(result)
    })
}
catch(error)
{
if(error!=null) response.status(500).send({error: error.message})
}
}

const product = {
    GetProducts,
    GetProductAttributes,
    GetFilteredProducts,
    GetProductDetailsById,
    GetProductByOrderId
};

module.exports = product;