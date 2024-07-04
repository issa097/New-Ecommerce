const order = require('../models/Order')

const GetOrder = async (req, res) => {

    try {
        const result = await order.GetOrder()
        console.log("assa", result);
        return res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
    }


}
const NewOrder = async (req, res) => {
    // console.log(req.body);
    // const user_id = req.user;
    try {
        const {
            user_id,
            cart,
        } = req.body;
        const product_id = cart.map((item) => {
            return item.product_id;
        });

        try {
            const newpayment = await order.NewOrder(
                user_id, product_id
            );

            return res.status(200).json(newpayment.rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json("internal server error");
        }

        // res.status(200).json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        // return res.status(500).json("internal server error");
    }
};


module.exports = {
    GetOrder,
    NewOrder
}