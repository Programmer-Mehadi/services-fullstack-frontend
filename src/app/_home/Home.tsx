import FooterSection from "@/components/ui/FooterSection";
import AvailableService from "./_sections/AvailableService";
import EventsByCategory from "./_sections/EventsByCategory";
import HeaderSection from "./_sections/HeaderSection";
import UpcomingService from "./_sections/UpcomingService";
import LatestBlog from "./_sections/LatestBlog";
import Newsletter from "./_sections/Newsletter";
import CallToActionCard from "./_sections/CallToActionCard";
import PricingSection from "./_sections/PricingSection";

const HomePage = () => {
  return (
    <section>
      <HeaderSection />
      <AvailableService />
      <UpcomingService />
      <EventsByCategory />
      <LatestBlog />
      <PricingSection />
      <Newsletter />
      <CallToActionCard />

      <FooterSection />
    </section>
  );
};

export default HomePage;
