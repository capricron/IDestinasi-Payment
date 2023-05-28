// import env
require('dotenv').config();
let midtransClient = require('midtrans-client');
const axios = require('axios')

const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-Wn-OiF8Hrzpfc1tfhUqcn6pS',
    clientKey : 'SB-Mid-client-t3qeoeFEcvMBziX8'

});

exports.paymentHandler = (req, res) => {
    const {payment, destination, user, total, token, qty} = req.body.paymentType

    const parameter = 
    {
        "payment_type": "bank_transfer",
        "bank_transfer": {
            "bank": payment
        },
        "transaction_details": {
            "order_id": token,
            "gross_amount": total
        },
        "item_details" : [
            {
                "id" : destination.id,
                "price" : destination.price,
                "quantity" : qty,
                "name" : `Destinasi ${destination.name}`,
            }
        ],
        "customer_details": {
            "first_name": user.name,
            "last_name": user.name,
            "email": user.email,
            "billing_address": {
                "first_name": user.name,
                "last_name": user.name,
                "email": user.email,
            },
            "shipping_address": {
                "first_name": user.name,
                "last_name": user.name,
                "email": user.email,
            }
        }
    }

    coreApi.charge(parameter).then((chargeResponse)=> {
        return res.json({
            message: 'Charge Response:',
            data: chargeResponse
        });
    })
}

exports.notificationMidtrans = async (req,res) => {

    const API_URL = 'http://localhost:3000'

    coreApi.transaction.notification(req.body)
    .then(async (status) => {
        if(status.transaction_status == "settlement"){
            axios.put(`${API_URL}/order/payment`, {
                status
            })
        }
    })
    // const order = await  OrderDestination.findOne({
    //     where: {

    // })

}