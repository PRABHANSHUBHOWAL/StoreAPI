const Product=require('../models/product')
const getAllProductsStatic = async (req,res) =>{
    // Filters : Hardcode
    // const products=await Product.find({});
    // const products=await Product.find({featured:true});
    const products=await Product.find({
        company:'caressa',
        featured:true  
    });
    res.status(200).json({products,nbhits:products.length});
}

const getAllProducts = async (req,res) =>{
    // Filters : Dynamic --> {{URL}}/products?name=bar+stool

    console.log(req.query);
    const products=await Product.find(req.query);
    res.status(200).json({products,nbhits:products.length});
}

const searchproducts = async (req,res) =>{
    res.status(200).json({msg : 'getAll'});
}

const sortProducts = async (req,res) =>{
    res.status(200).json({msg : 'getAll'});
}


module.exports= {   
    getAllProducts,
    getAllProductsStatic    
    };