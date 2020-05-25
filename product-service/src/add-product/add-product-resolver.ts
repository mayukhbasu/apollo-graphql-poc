
import * as yup from 'yup';
import { Product } from '../entity/Product';


const schema = yup.object().shape({
    title: yup.string().min(1).max(255).email(),
    price: yup.number().min(1).max(255),
    category: yup.string().min(1).max(255),
    url: yup.string().min(1)
});

export const addProductResolver:any = {
    Query: {
        dummy3: () => {
            console.log("mayukh123")
            return "Inside add product resolver"
        }
    },
    Mutation: {
        addProduct: async (parent, args, ctx, info) => {
            const {title, price, category, url} = args;
            console.log(args);
            try {
                schema.validate(args, {abortEarly: false})
            } catch(err) {
                console.log(err);
            }
            const productAlreadyExists = await Product.findOne({where: {title}});
            console.log(productAlreadyExists)
            if(productAlreadyExists){
                return null
            }
            const newProduct = Product.create({
                title, price, category, url
            });
            console.log(newProduct);
            await newProduct.save();
            return newProduct;
        }
    }
}
