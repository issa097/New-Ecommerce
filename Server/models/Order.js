const db = require("../lib/db")

function GetOrder() {
    return db.query("SELECT * FROM orders  WHERE is_deleted=false")
}

function NewOrder(
    user_id, product_id
) {
    try {
        const queryText =
            "INSERT INTO orders ( user_id,   product_id) VALUES ($1,$2) RETURNING *";

        const values = [

            user_id, product_id


        ];
        return db.query(queryText, values);
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    GetOrder,
    NewOrder
}