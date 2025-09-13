import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CropRecommendation } from "@/components/CropRecommendation";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CropRecommendation />
      <Footer />
    </div>
  );
};

export default Index;
