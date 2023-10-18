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
    </section>
  );
};

export default HomePage;
