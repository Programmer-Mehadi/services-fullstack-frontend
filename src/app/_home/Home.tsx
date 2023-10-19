import FooterSection from "@/components/ui/FooterSection";
import AvailableService from "./_sections/AvailableService";
import EventsByCategory from "./_sections/EventsByCategory";
import HeaderSection from "./_sections/HeaderSection";
import UpcomingService from "./_sections/UpcomingService";
import LatestBlog from "./_sections/LatestBlog";

const HomePage = () => {
  return (
    <section>
      <HeaderSection />
      <AvailableService />
      <UpcomingService />
      <EventsByCategory />
      <LatestBlog />
      <FooterSection />
    </section>
  );
};

export default HomePage;
