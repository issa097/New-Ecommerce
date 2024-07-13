const db = require("../lib/db");


function Replay(user_id, replay_text, rating_id) {
    const queryText = "insert into replies ( user_id, replay_text, rating_id) values ($1,$2,$3) RETURNING*"
    const value = [user_id, replay_text, rating_id]
    return db.query(queryText, value)
}
function Replayget() {
    const queryText = "select * from replies"
    // const value = []
    return db.query(queryText)
}


module.exports = {
    Replay,
    Replayget
}
