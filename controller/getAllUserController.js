const Connection = require('../config/db');

const getAllController = async (req, res) => {
  try {
    console.log(req.sessionID);
    const [results] = await (await Connection).execute('SELECT * FROM users');
    res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = getAllController;