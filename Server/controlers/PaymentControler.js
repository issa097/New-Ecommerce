const payment = require("../models/payment");
const stripe = require("stripe")(
  "sk_test_51O8NuQEIz9ME8FdttGncSSbHQjTnx1WQRQOgD4n4T2FhfmVIZAMJ54QDgphJ7CjCAoIJ15hrWt6HwLsrRINYk1Eg008qZhBwrn"
); // Replace with your actual Stripe secret key

const newpayment = async (req, res) => {
  // console.log(req.body);
  const user_id = req.user;
  try {
    const {
      cardholder,
      country,
      state,
      address,
      email,
      paymentMethodId,
      phone,
      amount,
      cart,
    } = req.body;
    const product_id = cart.map((item) => {
      return item.product_id;
    });
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount),
        currency: "USD",
        payment_method_types: ["card"], // Add the appropriate payment method types
        payment_method: paymentMethodId,
        confirm: true,
        description: "Done",

        return_url: "https://your-website.com/success",
      });
      console.log(amount) // Specify the return URL

      try {
        const newpayment = await payment.newpayment(
          user_id,
          cardholder,
          country,
          state,
          address,
          email,
          paymentMethodId,
          phone,
          amount,
          product_id
        );

        return res.status(200).json(newpayment.rows);
      } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
      }

      // res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    // return res.status(500).json("internal server error");
  }
};

const getpayments = async (req, res) => {
  try {
    const result = await payment.getAllpayments();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getpagipayments = async (req, res) => {
  try {
    const page = req.params.page;
    const limit = 5;
    const offset = (page - 1) * limit;
    console.log("I am here", page, limit);
    console.log("🤣🤣🤣🤣🤣", page, limit);

    const result = await payment.getAllpaymentspagi(limit, offset);

    if (!result) {
      console.error("Error fetching blog data");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalCount = await payment.getTotalCount(); // Implement a function to get the total count of products

    if (totalCount === undefined || totalCount === null) {
      console.error("Error fetching total count");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalPages = Math.ceil(totalCount / limit);

    const pagination = {
      current: page,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? parseInt(page) + 1 : null,
      total: totalPages,
    };

    res.json({ result, totalPages, pagination, limit });
  } catch (error) {
    console.error("Error in getpagi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getpaymentidUser = async (req, res) => {
  const user_id = req.params.userid;
  console.log(user_id);
  try {
    const result = await payment.getpaymentidUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getpaymentid = async (req, res) => {
  const payment_id = req.params.payment_id;
  console.log(payment_id);
  try {
    const result = await payment.getpaymentid(payment_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const deletepayment = async (req, res) => {
  const payment_id = req.params.payment_id;
  try {
    const result = await payment.deletepayment(payment_id);
    console.log(payment_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  newpayment,
  getpayments,
  getpaymentidUser,
  getpaymentid,
  deletepayment,
  getpagipayments,
};
