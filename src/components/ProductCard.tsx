import type { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/function"
import Image from "./Image"
import Button from "./ui/Button"

interface Iprops {
    product: IProduct
}


const ProductCard = ({product}:Iprops) => {
    const {title, description, imageURL, price, category} = product
  return (
    <div className="max-w-sm md:max-w-lg mx-auto border-2 border-gray-300 rounded-lg p-2 flex flex-col justify-between">
        <Image imageURL={imageURL} alt={category.name} className="rounded-t-lg"/>
        <h3 className="font-bold ">{title}</h3>
        <p>{`${txtSlicer(description)} .....`}</p>

        <div className="flex my-5 space-x-2">
            <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
            <span className="text-indigo-900 font-semibold">{`$${price}`}</span>
            <Image imageURL={imageURL} alt={category.name} className="w-5 h-5 rounded-full"/>
        </div>

        <div className="flex justify-between items-center space-x-2 mt-4">
            <Button className="bg-blue-700">EDIT</Button>
            <Button className="bg-red-800">DELETE</Button>
        </div>
    </div>
  )
}

export default ProductCard