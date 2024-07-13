const Replayss = require("../models/Replay");



const Replays = async (req, res) => {

    const user_id = req.user
    console.log(user_id)
    const { replay_text, rating_id } = req.body
    console.log("as;lkmlk;eknmeijnfnieni", user_id, replay_text, rating_id)

    const result = await Replayss.Replay(user_id, replay_text, rating_id)
    return res.status(200).json({ result: result.rows })

}

const Replayget = async (req, res) => {


    // const rating_id = req.params.rating_id
    // console.log("ss", rating_id)
    const result = await Replayss.Replayget()
    return res.status(200).json({ result: result.rows })

}

module.exports = {
    Replays,
    Replayget
}