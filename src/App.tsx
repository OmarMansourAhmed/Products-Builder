import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { productList, formInputsList } from "./data"
import { Button} from "@headlessui/react"
import Input from "./components/ui/Input"

const App = () => {
  // ** Modal State
  const [isOpen, setIsOpen] = useState(false)

  // ** Modal Handler
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  // ** Render 
  const renderProductsList = productList.map(product => <ProductCard key={product.id} product={product}/>)
  const renderFormInputsList = formInputsList.map(input => 
    <div className="flex flex-col mb-5">
        <label htmlFor={input.id} className="text-gray-700 rounded-lg">{input.label}</label>
        <Input type="text" id={input.id} name={input.name}/>      
    </div>
  )

  return (
    <div className="container mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800 text-white rounded-md p-3 m-3 cursor-pointer md:text-lg"
      onClick={openModal}>Build Your Product</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-2xl p-2">
        {renderProductsList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"ADD NEW PRODUCT"}>
        {renderFormInputsList}
        <div className="flex items-center space-x-2">
          <Button className="bg-indigo-400 hover:bg-indigo-700 text-white w-full rounded-md p-2 cursor-pointer">Submit</Button>
          <Button className="bg-gray-400 hover:bg-gray-700 text-white w-full rounded-md p-2 cursor-pointer">Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}

export default App
