const nodemailer = require('nodemailer');
/*
const CreateOrder = (request, response) => {
    try {

        const user = request.body.User;
        const cart = request.body.Cart;
        const remark = request.body.Remark;
        const totalAmount = request.body.totalAmount;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sumukhballal@gmail.com',
                pass: 'Sumukh.20261578'
            }
        });

        let mailOptions = {
            from: 'sumukhballal@gmail.com',
            to: `${user.Email}`,
            subject: "Congratulations! Your order placed succesfully.", // Subject line
            text: `Hello ${user.Name}`, // plain text body
            html: `<b>Hello  ${user.Name} </b>`
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
           // if (error) {
           //     console.log(error);
           //     return response.json(error);
           //} else {
               // console.log('Email sent: ' + info.response);

                let query = `INSERT INTO orders
                                (total_amount, created_on, shipped_on, status, comments, customer_id, auth_code, reference, shipping_id, tax_id)
                            VALUES
                            (
                                ${totalAmount}, 
                                CURDATE(), 
                                CURDATE(), 
                                1, 
                                '${remark}', 
                                ${user.CustomerId}, 
                                '', 
                                '', 
                                1, 
                                1
                            );`; //query database to get all the departments

                // execute query
                db.query(query, (err, result) => {
                    if (err != null) response.status(500).send({ error: error.message });
                    let values = [];
                    cart.forEach(element => {
                        let row = '';
                        row = `(
                            ${result.insertId},
                            ${element.ProductId},
                            '',
                            ${element.Quantity},
                            ${element.Price}
                        )`;
                        values.push(row);
                    });
                    let rows = values.toString();

                    let subQuery = `INSERT INTO order_detail
                                        (order_id, product_id, attributes, product_name, quantity, unit_cost)
                                    values ${rows};`; //query database to get all the departments

                    db.query(subQuery, (err, result) => {
                        if (err != null) response.status(500).send({ error: err.message });
                        return response.json(result);
                    });

                    return response.json(result);
                });
           // }
        });


    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};
*/


const CreateOrder = (request, response) => {
    try {

        const user = request.body.User;
        const cart = request.body.Cart;
        const remark = request.body.Remark;
        const totalAmount = request.body.totalPrice;
        
        
        let query = `INSERT INTO orders
                                (total_amount, created_on, status, comments, customer_id,store_id)
                            VALUES
                            (
                                ${totalAmount}, 
                                CURDATE(),
                                0, 
                                '${remark}', 
                                ${user.CustomerId},
                                1
                            );`;

                // execute query


                db.query(query, (error, result) => {
                    //if (error != null) response.status(500).send({ error: error.message });
                    let values = [];
                    cart.forEach(element => {
                        let row = '';
                        row = `(
                            ${result.insertId},
                            ${element.ProductId},
                            ${element.Quantity}
                        )`;
                        values.push(row);
                    });
                    let rows = values.toString();
                    let shippingQuery = `INSERT INTO shipping(shipping_type_id,delivery_date,shipper_id,order_id,status) 
                    values(8,"2019/12/9",1,${result.insertId},0)`

                    db.query(shippingQuery,(error,res) => {})

                    let subQuery = `INSERT INTO order_detail
                                        (order_id, product_id, quantity)
                                    values ${rows};`; //query database to get all the departments

                    db.query(subQuery, (error, res) => {
                       // if (error != null) response.status(500).send({ error: error.message });
                       // return response.json(res);
                    });

                    return response.json(result);
                });
        }
         catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const order = {
    CreateOrder
};

module.exports = order;