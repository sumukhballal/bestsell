
const GetCards = (request,response) => {
try{
    let customerId=request.query.customerID;
let query=`select card_id as 'cardId',
        card_number as 'cardNumber',
        expiry_month as 'expiryMonth',
        expiry_year as 'expiryYear',
        cvv as 'cvv'
        from card_details 
        where customer_id=${customerId}`

db.query(query,(err,result) => { 
    if(err!=null) return response.status(500).send({err:err.message})

    return response.json(result)
})

}
catch(error)
{
response.status(500).send({error: error.message})
}
}

const cards = {
GetCards
};

module.exports=cards;