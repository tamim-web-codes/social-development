import { Banner } from "@/components/Banner";
import CommunityInAction from "@/components/commuinity-in-Action";
import { FeatureSection } from "@/components/featuresection";
import RecentUpcomming from "@/components/recentUpcomming";
import Subscriton from "@/components/subcribtion";

export default function Home() {
    return (
        <div id="top" className="px-4 pb-10 sm:px-6">

            <Banner />
            <FeatureSection />
            <RecentUpcomming />
            <CommunityInAction />
            <Subscriton />
        </div>
    );
}
