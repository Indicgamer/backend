const Connection = require('../config/db');

const addProdController = async (req, res) => {
    try {
        const name = req.session.username;
        const product_idea = req.body.product_idea;
        if(product_idea){
            const [result] = await (await Connection).execute("INSERT INTO product_ideas (name, product_idea) VALUES (?, ?)", [name, product_idea]);
            console.log(result);
            res.status(201).json({message:"Product idea added successfully", success:true});
        }else{
            res.status(400).json({message:"Product idea cannot be empty", success:false});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


const allProdOfUserController = async (req, res) => {
    try {
        const [results] = await (await Connection).execute("SELECT * FROM product_ideas WHERE name = ?", [req.session.username]);
        res.status(200).json({product_ideas:results, success:true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
};

const prodAllController = async (req, res) => {
    try {
        const [results] = await (await Connection).execute("SELECT * FROM product_ideas");
        res.status(200).json({product_ideas:results, success:true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
}



module.exports = {addProdController, allProdOfUserController, prodAllController};