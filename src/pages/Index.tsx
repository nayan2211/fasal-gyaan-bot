import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CropRecommendation } from "@/components/CropRecommendation";
import { Footer } from "@/components/Footer";

const Index = () => {
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
