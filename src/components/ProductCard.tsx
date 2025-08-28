import type { IProduct } from "../interfaces"
import Image from "./Image"
import Button from "./ui/Button"

interface Iprops {
    product: IProduct
}


const ProductCard = ({product}:Iprops) => {
    const {title, description, imageURL} = product
  return (
    <div className="border-2 rounded-md p-2 flex flex-col">
        <Image imageURL={imageURL} alt={title}/>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="flex my-5 space-x-2">
            <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
            <span>$500,000</span>
            <Image imageURL={imageURL} alt={title} className="w-5 h-5 rounded-full"/>
        </div>

        <div className="flex justify-between items-center space-x-2 mt-4">
            <Button className="bg-blue-700">EDIT</Button>
            <Button className="bg-red-800">DELETE</Button>
        </div>
    </div>
  )
}

export default ProductCard