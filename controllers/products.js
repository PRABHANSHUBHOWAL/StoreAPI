const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
    // Filters : Hardcode
    // const products=await Product.find({});
    // const products=await Product.find({featured:true});
    const products = await Product.find({
        // company:'caressa',
        featured: false,
        name: { $regex: 'sue', $options: 'i' }
    });
    res.status(200).json({ products, nbhits: products.length });
}

const getAllProducts = async (req, res) => {
    // Filters : Dynamic --> {{URL}}/products?name=bar+stool
    // Approach 1
    // console.log(req.query);
    // const products=await Product.find(req.query);
    // res.status(200).json({products,nbhits:products.length});

    // Approach 2
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    // console.log(req.query);

    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    // if(sort){
    //     queryObject.sort=sort;
    // }
    
    

    // Numeric Filters
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|<=|=|>|>=)\b/g;
        const options = ['price', 'rating'];
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        filters = filters.split(',').forEach((item) => {
            const [fields, operator, value] = item.split('-');
            if (options.includes(fields)) {
              queryObject[fields] = { [operator]: Number(value) };
            }
        });
        
    }
    let result = Product.find(queryObject);

    
    // Sorting
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    // Fields
    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || result.length;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    console.log(queryObject);
    products = await result;
    res.status(200).json({ products, nbhits: products.length });

}

// const searchproducts = async (req,res) =>{
//     res.status(200).json({msg : 'getAll'});
// }

// const sortProducts = async (req,res) =>{
//     // const products=await Product.find({}).sort('company');
//     res.status(200).json({msg : 'getAll'});
// }


module.exports = {
    getAllProducts,
    getAllProductsStatic,
};