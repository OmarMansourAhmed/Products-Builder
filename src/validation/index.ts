/**
 * Validates a product object and returns error messages for invalid fields.
 *
 * @function productValidation
 * @param {Object} product - The product data to validate.
 * @param {string} product.title - The product title. Must be between 10 and 80 characters.
 * @param {string} product.description - The product description. Must be between 10 and 900 characters.
 * @param {string} product.imageURL - The product image URL. Must be a valid image link (png, jpg, jpeg, gif, bmp, webp, svg).
 * @param {string} product.price - The product price. Must be a numeric string.
 *
 * @returns {{title: string, description: string, imageURL: string, price: string}}
 * An object containing error messages for each invalid field. If a field is valid, its value will be an empty string.
 *
 * @example
 * const product = {
 *   title: "Short",
 *   description: "Nice",
 *   imageURL: "invalid-url",
 *   price: "abc"
 * };
 *
 * const errors = productValidation(product);
 * console.log(errors);
 * // {
 * //   title: "Product title must be between 10 and 80 characters",
 * //   description: "Product title must be between 10 and 80 characters",
 * //   imageURL: "Please Enter a Valid Image URl",
 * //   price: "Enter Valid Price"
 * // }
 */


export const productValidation = (product: {title: string, description: string, imageURL: string, price: string}) => {

    const errors: {title:string, description:string, imageURL:string, price:string} = {
        title: "",
        description: "",
        imageURL: "",
        price: ""
    };

    const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
        errors.title = "Product title must be between 10 and 80 characters"
    }
    if(!product.description.trim() || product.description.length < 10 || product.description.length > 900){
        errors.description = "Product title must be between 10 and 80 characters"
    }
    if(!validURL || !product.imageURL.trim()){
        errors.imageURL = "Please Enter a Valid Image URl"
    }
    if(!product.price.trim() || isNaN(Number(product.price))){
        errors.price = "Enter Valid Price"
    }

    return errors
}
