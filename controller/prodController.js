const {Users,Products_idea} = require('../config/db');

const addProdController = async (req, res) => {
    try {
        if(!(req.body.description)){
            return res.status(400).json({message:"Description of the product are required", success:false});
        }
        const id = await Products_idea.find().countDocuments();
        const user = await Users.find({_id:req.cookies._id});
        const product = new Products_idea({
            _id:id+1,
            name:user[0].username,
            description:req.body.description
        });
        await product.save();
        return res.status(201).json({message:"Product Idea added successfully", success:true});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"+error,
            success: false
        });
    }
};


const allProdOfUserController = async (req, res) => {
    try {
        const allProducts = await Products_idea.find({_name:req.params.name});
        const allProdIdeas = allProducts.map((product) => {
            return product.description;
        });
        return res.status(200).json({message:"All product ideas of the user", success:true, data:allProdIdeas});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"+error,
            success: false
        });
        
    }
};

const prodAllController = async (req, res) => {
    try {
        const allProducts = await Products_idea.find();
        const allProdIdeas = allProducts.map((product) => {
            return product.description;
        });
        return res.status(200).json({message:"All product ideas", success:true, data:allProdIdeas});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
}



module.exports = {addProdController, allProdOfUserController, prodAllController};