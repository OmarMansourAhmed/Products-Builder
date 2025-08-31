import type { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/function"
import CircleColor from "./CircleColor"
import Image from "./Image"
import Button from "./ui/Button"


interface Iprops {
    product: IProduct,
    setProductToEdit: (product: IProduct) => void,
    openEditModal: () => void,
    idx: number,
    setProductToEditIdx: (value: number) => void
}


const ProductCard = ({product, setProductToEdit, openEditModal, idx, setProductToEditIdx}:Iprops) => {
    const {title, description, imageURL, price, colors ,category} = product

    const renderProductColors = colors.map(color =>(
      <CircleColor key={color} color={color}/>
  ))

const editHandler = (): void => {
    setProductToEdit(product);
    openEditModal()
    setProductToEditIdx(idx)
}

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border-2 border-gray-300 rounded-lg p-2 flex flex-col justify-between">
        <Image imageURL={imageURL} alt={category.name} className="rounded-t-lg"/>
        <h3 className="font-bold ">{title}</h3>
        <p>{`${txtSlicer(description)} .....`}</p>

        <div className="flex space-x-1 items-center">{renderProductColors}</div>
        {/* <div className="flex my-5 space-x-2">
            <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
            <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        </div> */}

        <div className="flex items-center justify-between">
            <span className="text-indigo-900 font-semibold">{`$${price}`}</span>
            <Image imageURL={category.imageURL} alt={category.name} className="w-5 h-5 rounded-full"/>
        </div>

        <div className="flex justify-between items-center space-x-2 mt-4">
            <Button className="bg-indigo-700 hover:bg-indigo-600" onClick={editHandler}>EDIT</Button>
            <Button className="bg-red-800 hover:bg-red-700">DELETE</Button>
        </div>
    </div>
  )
}

export default ProductCard