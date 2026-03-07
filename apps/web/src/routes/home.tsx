import { HeroSection } from '../components/hero/HeroSection';
import { FeaturesSection } from '../components/features/FeaturesSection';
import { HowItWorksSection } from '../components/features/HowItWorksSection';
import { DeveloperInsights } from '../components/charts/DeveloperInsights';
import { CliPreviewSection } from '../components/cli-preview/CliPreviewSection';

export default function Home() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <HeroSection />
            <FeaturesSection />
            <DeveloperInsights />
            <HowItWorksSection />
            <CliPreviewSection />
        </div>
    );
}
