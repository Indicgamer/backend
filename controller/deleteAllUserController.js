const Connection = require('../config/db');

const deleteAllController = async (req, res) => {
    try {
        const [results] = await (await Connection).execute('DELETE FROM users');
        res.status(200).json({ 
            message: 'All users deleted',
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            message: 'Internal Server Error',
        success: false
    });
    }
};

module.exports = deleteAllController;