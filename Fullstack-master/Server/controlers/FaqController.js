const FAQ = require("../models/Faq");

const getFaq = async (req, res) => {
  try {
    const result = await FAQ.getFaq();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const DeleteFaq = async (req, res) => {
  const faq_id = req.params.faq_id;
  try {
    const result = await FAQ.DeleteFaq(faq_id);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const UpdateFaq = async (req, res) => {
  const faq_id = req.params.faq_id;
  try {
    const { question, answer } = req.body;
    const result = await FAQ.UpdateFaq(faq_id, question, answer);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const AddFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const newblog = await FAQ.AddFaq(question, answer);

    return res.status(200).json(newblog.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

module.exports = {
  getFaq,
  AddFaq,
  DeleteFaq,
  UpdateFaq,
};
