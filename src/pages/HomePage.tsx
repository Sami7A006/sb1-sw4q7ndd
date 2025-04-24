import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, Heart, UtensilsCrossed, MessageSquare, AlertTriangle, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <ScanLine className="h-10 w-10 text-primary" />,
      title: 'Product Scanner',
      description: 'Scan product ingredients to identify harmful chemicals using EWG database.',
      link: '/scan',
      color: 'from-primary-light to-primary',
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: 'Health Tracker',
      description: 'Calculate BMI, set weight goals, and get personalized recommendations.',
      link: '/health',
      color: 'from-red-400 to-red-600',
    },
    {
      icon: <UtensilsCrossed className="h-10 w-10 text-secondary" />,
      title: 'Diet Plans',
      description: 'Get AI-generated diet plans based on your weight goals and budget.',
      link: '/diet',
      color: 'from-secondary-light to-secondary',
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
      title: 'AI Assistant',
      description: 'Chat with our AI assistant for health and product recommendations.',
      link: '/chat',
      color: 'from-indigo-400 to-indigo-600',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero section */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1 
            className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Make Informed Health Choices
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              With AI-Powered Analysis
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Scan products, track your health, and get personalized recommendations 
            to make better health decisions every day.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/scan">
              <Button variant="primary" size="lg" icon={<ScanLine className="h-5 w-5" />}>
                Scan a Product
              </Button>
            </Link>
            <Link to="/health">
              <Button variant="outline" size="lg" icon={<Heart className="h-5 w-5" />}>
                Check My Health
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features section */}
      <section className="py-12">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <Card hover className="h-full">
                  <div className={`mb-4 h-16 w-16 rounded-full bg-gradient-to-br ${feature.color} p-3 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-12">
        <div className="rounded-2xl bg-gradient-to-r from-primary-light to-secondary-light p-8 text-white shadow-lg">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Why Choose HealthScan?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <AlertTriangle className="mb-4 h-10 w-10" />
                <h3 className="mb-2 text-xl font-semibold">Identify Harmful Ingredients</h3>
                <p className="text-white/80">
                  Our AI scans ingredients from product labels and cross-references with the EWG database to identify potentially harmful chemicals.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <Shield className="mb-4 h-10 w-10" />
                <h3 className="mb-2 text-xl font-semibold">Make Safer Choices</h3>
                <p className="text-white/80">
                  Get real user reviews from Reddit and detailed safety information to help you make better decisions about the products you use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;