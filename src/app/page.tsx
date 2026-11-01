import { Banner } from "@/components/Banner";
import { FeatureSection } from "@/components/featuresection";

export default function Home() {
    return (
        <div className="px-4 pb-10 sm:px-6">
            <Banner />
            <FeatureSection />
        </div>
    );
}
