import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShoppingCart, Heart } from 'lucide-react';

function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src="https://images.pexels.com/photos/2611815/pexels-photo-2611815.jpeg"
              alt="Product"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Organic Quinoa</h1>
              <p className="mt-2 text-xl text-gray-500">$24.99</p>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">
                Premium organic quinoa sourced from sustainable farms. Rich in protein, fiber, and essential nutrients.
                Perfect for healthy meals and dietary conscious individuals.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>Organic Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>Gluten-Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>Non-GMO</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Card className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Nutrition Facts</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-medium">8g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber</span>
                  <span className="font-medium">5g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Iron</span>
                  <span className="font-medium">15% DV</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;