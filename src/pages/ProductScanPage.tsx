import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Upload, Camera, Loader, AlertCircle, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockScanIngredients } from '../utils/mockData';

const ProductScanPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRatingLabel = (score: number) => {
    if (score >= 9) return { label: '🟢 Very Safe', description: 'Clean and non-toxic. Low risk for all skin types.' };
    if (score >= 7) return { label: '✅ Mostly Safe', description: 'Generally safe, but minor concerns for sensitive skin types.' };
    if (score >= 5) return { label: '⚠️ Caution', description: 'Some questionable ingredients. May cause irritation in some users.' };
    if (score >= 3) return { label: '⚠️ Unsafe', description: 'Several concerning ingredients. Only use if you\'re sure it\'s okay.' };
    return { label: '❌ Strong No', description: 'Contains highly harmful ingredients. High risk for skin. Avoid.' };
  };

  const getRatingColor = (score: number) => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 7) return 'bg-emerald-500';
    if (score >= 5) return 'bg-yellow-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setError(null);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setError("Camera functionality not implemented in this demo");
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      setError("Could not access camera. Please check permissions.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleScan = () => {
    if (!image) return;
    
    setIsScanning(true);
    setError(null);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScanIngredients);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Product Scanner</h1>
        <p className="mb-8 text-center text-lg text-gray-600">
          Upload a photo of product ingredients to analyze for harmful chemicals.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column - Image upload */}
          <div className="order-2 lg:order-1">
            <Card>
              <h2 className="mb-4 text-xl font-semibold">Upload Product Image</h2>
              
              <div className={`flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${image ? 'border-primary' : 'border-gray-300'}`}>
                {image ? (
                  <div className="w-full">
                    <img src={image} alt="Uploaded product" className="mx-auto max-h-[250px] object-contain" />
                    <div className="mt-4 flex justify-center gap-2">
                      <Button variant="outline" onClick={() => setImage(null)}>
                        Remove
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleScan}
                        isLoading={isScanning}
                        icon={<ScanLine className="h-5 w-5" />}
                      >
                        {isScanning ? 'Scanning...' : 'Scan Ingredients'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ScanLine className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="mb-4 text-gray-500">Upload a clear image of the product ingredients list</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button
                        variant="primary"
                        onClick={handleUploadClick}
                        icon={<Upload className="h-5 w-5" />}
                      >
                        Upload Image
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCameraCapture}
                        icon={<Camera className="h-5 w-5" />}
                      >
                        Use Camera
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right column - Scan results */}
          <div className="order-1 lg:order-2">
            <Card>
              <h2 className="mb-4 text-xl font-semibold">Ingredient Analysis</h2>
              
              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-gray-600">Analyzing ingredients...</p>
                </div>
              ) : scanResult ? (
                <div>
                  <div className="mb-6 rounded-lg bg-gray-50 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {getRatingLabel(scanResult.overallRating.score).label}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {getRatingLabel(scanResult.overallRating.score).description}
                        </p>
                      </div>
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${getRatingColor(scanResult.overallRating.score)} text-white`}>
                        <span className="text-2xl font-bold">{scanResult.overallRating.score}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Based on EWG database analysis of {scanResult.ingredients.length} ingredients
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="mb-3 text-lg font-medium">Identified Ingredients:</h3>
                  <ul className="space-y-3">
                    {scanResult.ingredients.map((ingredient: any, index: number) => (
                      <li key={index} className="rounded-lg border border-gray-200 p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-medium">{ingredient.name}</span>
                            <p className="mt-1 text-sm text-gray-600">{ingredient.description}</p>
                          </div>
                          <span className={`ml-2 h-8 w-8 flex items-center justify-center rounded-full text-white font-bold ${getRatingColor(ingredient.ratingOutOf10)}`}>
                            {ingredient.ratingOutOf10}
                          </span>
                        </div>
                        {ingredient.concerns.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium uppercase text-gray-500">Health Concerns:</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {ingredient.concerns.map((concern: string, i: number) => (
                                <span key={i} className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                                  {concern}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 p-4">
                    <ScanLine className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="mb-2 text-lg">No Scan Results Yet</p>
                  <p className="text-sm">Upload an image and scan to see ingredient analysis</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductScanPage;