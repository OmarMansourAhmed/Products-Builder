import { useState, type ChangeEvent, type FormEvent } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { productList, formInputsList, colors } from "./data"
import { Button} from "@headlessui/react"
import Input from "./components/ui/Input"
import Error from "./components/Error"
import type { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import CircleColor from "./components/CircleColor"
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultProductFormInput = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }

  // ** Form
  const [product, setProduct] = useState<IProduct>(defaultProductFormInput)
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [error, setError] = useState({ title: "", description: "", imageURL: "", price: "" })
  const [tempColor, setTempColor] = useState<string[]>([])
  console.log(tempColor);
  

  // ** Form Handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target

    setProduct({
      ...product,
      [name]: value
    });
    setError({
      ...error,
      [name]: ""
    })
  } 

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const {title, description, price, imageURL} = product

    const errors = productValidation({
      title,
      description,
      price,
      imageURL
    })
    
    // **
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    console.log(hasErrorMsg);
    if(!hasErrorMsg){
      setError(errors)
      return;
    }

    // Clear errors if everything is valid
    setError({ title: "", description: "", imageURL: "", price: "" });
    // console.log("Send to Server");

    setProducts(prev => [{...product, id: uuid(), colors: tempColor} ,...prev])
    setProduct(defaultProductFormInput)
    setTempColor([])
    closeModal()
  }

  const onCancel = () => {
    setProduct(defaultProductFormInput)
    closeModal()
  }


  // ** Modal State
  const [isOpen, setIsOpen] = useState(false)

  // ** Modal Handler
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)



  // ** Render 
  const renderProductsList = products.map(product => <ProductCard key={product.id} product={product}/>)

  const renderFormInputsList = formInputsList.map(input => 
    <div className="flex flex-col" key={input.id}>
        <label htmlFor={input.id} className="text-gray-700 rounded-lg">{input.label}</label>
        <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
        <Error msg={error[input.name]}/>
    </div>
  )

  const renderProductColors = colors.map(color =>(
      <CircleColor key={color} color={color} onClick={() => {
        if(tempColor.includes(color)){
          setTempColor(prev => prev.filter(item => item !== color))
          return;
        }
        setTempColor(prev =>  [...prev, color])
      }}/>
  ))


  return (
    <div className="container mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800 text-white rounded-md p-3 m-3 cursor-pointer md:text-lg"
      onClick={openModal}>Build Your Product</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-2xl p-2">
        {renderProductsList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"ADD NEW PRODUCT"}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputsList}
          <div className="flex space-x-1 items-center">
            {renderProductColors}
          </div>
          <div className="flex flex-nowrap space-x-1 items-center">
            {tempColor.map(color => (
              <span
                key={color} className="p-1 mr-1 text-xs rounded-md text-white" style={{backgroundColor: color}}>
                  {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-700 hover:bg-indigo-500 text-white w-full rounded-md p-2 cursor-pointer"
              type="submit">Submit</Button>
            <Button className="bg-gray-600 hover:bg-gray-400 text-white w-full rounded-md p-2 cursor-pointer"
              onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default App
