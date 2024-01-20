import FooterSection from "@/components/ui/FooterSection"
import AvailableService from "./_sections/AvailableService"
import CallToActionCard from "./_sections/CallToActionCard"
import EventsByCategory from "./_sections/EventsByCategory"
import HeaderSection from "./_sections/HeaderSection"
import LatestBlog from "./_sections/LatestBlog"
import Newsletter from "./_sections/Newsletter"
import PricingSection from "./_sections/PricingSection"
import SurvaySections from "./_sections/SurvaySections"
import UpcomingService from "./_sections/UpcomingService"
import ElevateYourInteriors from "@/app/_home/_sections/ElevateYourInteriors"

const HomePage = () => {
  return (
    <section>
      <HeaderSection />
      <ElevateYourInteriors />
      <AvailableService />
      <UpcomingService />
      <EventsByCategory />
      <LatestBlog />
      <SurvaySections />
      <PricingSection />
      <Newsletter />
      <CallToActionCard />

      <FooterSection />
    </section>
  )
}

export default HomePage
