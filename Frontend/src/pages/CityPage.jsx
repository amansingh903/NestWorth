import { useParams } from "react-router-dom";
import cities from "../Data/cities.json";

import CityStyles from "../components/city/CityStyles";
import Hero from "../components/city/Hero";
import SectionHeader from "../components/city/SectionHeader";
import ExperienceCenter from "../components/city/ExperienceCenter";
import ProcessSteps from "../components/city/ProcessSteps";
import BudgetHomes from "../components/city/BudgetHomes";
import Reviews from "../components/city/Reviews";
import FAQs from "../components/city/FAQs";

export default function CityPage() {
  const { city } = useParams();
  const data = cities.find(c => c.slug === city);

  if (!data) return <h1 style={{ padding: 40 }}>City not found</h1>;

  return (
    <>
      <CityStyles />

      {/* <Hero city={data.name} /> */}

      <SectionHeader
        title={`Home Interiors in ${data.name}`}
        subtitle="No physical experience center available currently."
      />
{/* 
      <ExperienceCenter city={data.name} /> */}
      <ProcessSteps />
      <BudgetHomes />
      <Reviews />
      <FAQs city={data.name} />
    </>
  );
}
