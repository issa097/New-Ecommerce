const { as } = require("pg-promise");
const cart = require("../models/Cart");

const additem = async (req, res) => {
  const user_id = req.user;

  try {
    const { product_id, quantity } = req.body;
    console.log("object", quantity);
    const newItem = await cart.additem(product_id, user_id, quantity);
    return res.status(200).json(newItem.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetItem = async (req, res) => {
  const user_id = req.user;

  try {
    const GetItem = await cart.GetItem(user_id);
    return res.status(200).json(GetItem.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  const cart_id = req.params.cart_id;

  const { quantity } = req.body;
  try {
    const result = await cart.updateCart(cart_id, quantity);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const updateCart2 = async (req, res) => {
  const product_id = req.params.product_id;

  const { quantity } = req.body;
  try {
    const result = await cart.updateCart2(product_id, quantity);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  additem,
  GetItem,
  updateCart,
  updateCart2
};
