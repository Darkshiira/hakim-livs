import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MainSection from "../components/MainSection";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className="bg-green-200">
      <Nav />
      <Hero />
      <MainSection />;
    </div>
  );
}
