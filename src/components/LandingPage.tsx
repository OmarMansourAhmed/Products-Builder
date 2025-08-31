import Button from "./ui/Button"

const LandingPage = ({ onScrollToProducts }: { onScrollToProducts: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
            Build Your
            <span className="text-indigo-600 block">Product Empire</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create, manage, and showcase your products with our intuitive product builder. 
            Design beautiful product cards, manage inventory, and grow your business effortlessly.
          </p>
          
          <div className="flex sm:flex-row gap-4 justify-center w-fit">
            <Button 
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onScrollToProducts}
            >
              Explore Products
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              Why Choose Our Product Builder?
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to create and manage your product catalog
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">Easy Creation</h3>
              <p className="text-gray-600">Create products in minutes with our intuitive form builder</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">Beautiful Display</h3>
              <p className="text-gray-600">Showcase your products with stunning, responsive cards</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">Smart Management</h3>
              <p className="text-gray-600">Edit, update, and organize your products with ease</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of creators who trust our platform to showcase their products
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 