const db = require("../lib/db");

function AddFaq(question, answer) {
  const queryText = `INSERT INTO faq (question, answer) VALUES ($1, $2) RETURNING *`;
  const result = [question, answer];
  return db.query(queryText, result);
}

function getFaq() {
  const queryText = `SELECT * FROM faq WHERE is_deleted = false;`;

  return db.query(queryText);
}
function DeleteFaq(faq_id) {
  const queryText =
    "UPDATE faq SET is_deleted = true WHERE faq_id = $1 AND is_deleted = false RETURNING *";
  const result = [faq_id];

  return db.query(queryText, result);
}
function UpdateFaq(faq_id, question, answer) {
  const queryText = ` UPDATE faq 
  SET 
  question = COALESCE($2, question), 
    answer = COALESCE($3, answer)
   
    
  WHERE 
  faq_id = $1 
  RETURNING *`;
  const result = [faq_id, question, answer];

  return db.query(queryText, result);
}

module.exports = {
  AddFaq,
  getFaq,
  DeleteFaq,
  UpdateFaq,
};
