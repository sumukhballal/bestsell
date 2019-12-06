const GetShippingRegions = (request, response) => {
    try {
        let query = `SELECT 
                        A.shipping_region_id AS 'RegionId',
                        A.shipping_region AS 'Region'
                    FROM shipping_region A 
                    ORDER BY shipping_region_id ASC`; // query database to get all the  Shipping Regions

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ error: error.message });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};


const GetShippingDetailsWithOrderId = (request, response) => {
    try {
        OrderId=request.query.orderId
        let query = `SELECT 
                    s.shipping_id as 'ShippingId',
                    st.shipping_type as 'ShippingType',
                    sh.name as 'ShipperName',
                    s.delivery_date as 'DeliveryDate',
                    s.status as 'DeliveryStatus'
                    FROM shipping s,shipper sh,shipping_type st
                    where 
                    s.shipper_id=sh.shipper_id and 
                    st.shipping_type_id=s.shipping_type_id
                    and s.order_id=${OrderId}
                    `; // query database to get all the  Shipping Regions

        // execute query
        db.query(query, (err, result) => {
           if (err != null) response.status(500).send({ err: err.message });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const shipping = {
    GetShippingRegions,
    GetShippingDetailsWithOrderId
};

module.exports = shipping; 