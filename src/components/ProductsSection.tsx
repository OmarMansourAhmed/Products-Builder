import { useState, type ChangeEvent, type FormEvent } from "react"
import ProductCard from "./ProductCard"
import Modal from "./ui/Modal"
import { productList, formInputsList, colors, categories } from "../data"
import { Button} from "@headlessui/react"
import Input from "./ui/Input"
import Error from "./Error"
import type { IProduct } from "../interfaces"
import { productValidation } from "../validation"
import CircleColor from "./CircleColor"
import { v4 as uuid } from "uuid";
import SelectMenu from "./ui/SelectMenu"
import type { productName } from "../type"

const ProductsSection = () => {
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

  // ** states
  const [product, setProduct] = useState<IProduct>(defaultProductFormInput)
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [error, setError] = useState({ title: "", description: "", imageURL: "", price: "" })
  const [tempColor, setTempColor] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductFormInput)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // ** Handlers
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
  
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target

    setProductToEdit({
      ...productToEdit,
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
    
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    console.log(hasErrorMsg);
    if(!hasErrorMsg){
      setError(errors)
      return;
    }

    setError({ title: "", description: "", imageURL: "", price: "" });

    setProducts(prev => [{...product, id: uuid(), colors: tempColor, category: selectedCategory} ,...prev])
    setProduct(defaultProductFormInput)
    setTempColor([])
    closeModal()
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault()
  const {title, description, price, imageURL} = productToEdit

  const errors = productValidation({
    title,
    description,
    price,
    imageURL
  })
  
  const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
  console.log(hasErrorMsg);
  if(!hasErrorMsg){
    setError(errors)
    return;
  }

  setError({ title: "", description: "", imageURL: "", price: "" });

  const updatedProducts = [...products];
  updatedProducts[productToEditIdx] = {...productToEdit, colors: tempColor.concat(productToEdit.colors)};
  setProducts(updatedProducts);
  
  setProductToEdit(defaultProductFormInput)
  setTempColor([])
  closeEditModal()
  }

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id)
    setProducts(filtered)

    closeConfirmModal()
  }

  const onCancel = () => {
    setProduct(defaultProductFormInput)
    closeModal()
  }

  // ** Modal State
  const [isOpen, setIsOpen] = useState(false)

  // ** Modal Handler
  const closeModal = () => setIsOpen(false)
  const closeEditModal = () => setIsOpenEditModal(false)
  const openModal = () => setIsOpen(true)
  const openEditModal = () => setIsOpenEditModal(true)
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  // ** Render 
  const renderProductsList = products.map((product, idx) => <ProductCard key={product.id} product={product}
    setProductToEdit={setProductToEdit} openEditModal={openEditModal} idx={idx} setProductToEditIdx={setProductToEditIdx} openConfirmModal={openConfirmModal}/>)

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

  const renderEditProductsWithErrorMsg = (id: string, label: string, name: productName) => {
    return (
      <div className="flex flex-col">
            <label htmlFor={id} className="text-gray-700 rounded-lg">
              {label}
            </label>
            <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler}/>
            <Error msg={error[name]}/>
        </div>
    )
  }

  return (
    <div id="products" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">
            Your Products
          </h2>
          <p className="text-gray-600 text-lg">
            Manage and showcase your product catalog
          </p>
        </div>

        {/* Build Product Button */}
        <div className="text-center mb-8">
          <Button className="bg-indigo-700 hover:bg-indigo-800 text-white rounded-md p-3 cursor-pointer md:text-lg"
          onClick={openModal}>Build Your Product</Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-2xl p-2">
          {renderProductsList}
        </div>

        {/* Add Product Modal */}
        <Modal isOpen={isOpen} closeModal={closeModal} title={"ADD NEW PRODUCT"}>
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputsList}
            <SelectMenu selected = {selectedCategory} setSelected={setSelectedCategory}/>
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

        {/* Edit Modal */}
        <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title={"EDIT YOUR PRODUCT"}>
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderEditProductsWithErrorMsg('title', 'Product title', 'title')}
            {renderEditProductsWithErrorMsg('description', 'Product Description', 'description')}
            {renderEditProductsWithErrorMsg('imageURL', 'Product Image', 'imageURL')}
            {renderEditProductsWithErrorMsg('price', 'Product Price', 'price')}
            <SelectMenu selected = {productToEdit.category}
              setSelected={(value) => setProductToEdit({...productToEdit, category: value})}/>
            <div className="flex space-x-1 items-center">
              {renderProductColors}
            </div>
            <div className="flex flex-nowrap space-x-1 items-center">
              {tempColor.concat(productToEdit.colors).map(color => (
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

        {/* Remove Product Modal */}
        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Button className="bg-[#c2344d] hover:bg-red-800 p-3 rounded-xl text-white cursor-pointer" onClick={removeProductHandler}>
              Yes, remove
            </Button>
            <Button className="bg-[#f5f5fa] hover:bg-gray-300 p-3 rounded-xl !text-black cursor-pointer" onClick={closeConfirmModal}>
              Cancel
            </Button>
          </div> 
        </Modal>
      </div>
    </div>
  )
}

export default ProductsSection 