import FooterSection from "@/components/ui/FooterSection";
import AvailableService from "./_sections/AvailableService";
import EventsByCategory from "./_sections/EventsByCategory";
import HeaderSection from "./_sections/HeaderSection";
import UpcomingService from "./_sections/UpcomingService";

const HomePage = () => {
  return (
    <section>
      <HeaderSection />
      <AvailableService />
      <UpcomingService />
      <EventsByCategory />
      <FooterSection />
    </section>
  );
};

export default HomePage;
