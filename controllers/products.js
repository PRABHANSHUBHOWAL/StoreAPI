const getAllProductsStatic = async (req,res) =>{
    res.status(200).json({msg : 'getAll testing'});
}

const getAllProducts = async (req,res) =>{
    res.status(200).json({msg : 'getAll'});
}



module.exports= {   
    getAllProductsStatic,
    getAllProducts
    };