import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/home/Hero/Hero";
import CategorySection from "../../components/home/CategorySection/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";

function Home() {
  console.log("Home Render");

  return (
    <MainLayout>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </MainLayout>
  );
}

export default Home;
