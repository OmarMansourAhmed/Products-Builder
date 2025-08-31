import LandingPage from "./components/LandingPage"
import ProductsSection from "./components/ProductsSection"

const App = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="min-h-screen">
      <LandingPage onScrollToProducts={scrollToProducts} />
      <ProductsSection />
    </div>
  )
}

export default App
