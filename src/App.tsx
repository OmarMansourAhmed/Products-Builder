import ProductCard from "./components/ProductCard"
import { productList } from "./data"

const App = () => {
  // ** Render Products
  const renderProductsList = productList.map(product => <ProductCard key={product.id} product={product}/>)

  return (
    <div className="">
      <div className="border-2 border-red-600 m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-2xl p-2">
        {renderProductsList}
      </div>
    </div>
  )
}

export default App
