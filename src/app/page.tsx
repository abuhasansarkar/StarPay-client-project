import Hero from "@/components/(home-sections)/Hero";
import LogoSlider from "@/components/(home-sections)/LogoSlider";
import Works from "@/components/(home-sections)/Works";
import TestimonialsSlider from "@/components/(home-sections)/TestimonialsSlider";
import Pricing from "@/components/(home-sections)/Pricing";
import Compare from "@/components/(home-sections)/Compare";
import Faq from "@/components/(home-sections)/Faq";

export default function Home() {
    return (
        <div className="">
            <Hero />
            <LogoSlider />
            <Works />
            <TestimonialsSlider />
            <Pricing />
            <Compare />
            <Faq />
        </div>
    );
}
