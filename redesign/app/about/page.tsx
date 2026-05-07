import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FadeIn } from "@/components/animations/fade-in";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { aboutData } from "@/lib/about";
import { MapPin, Briefcase } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About | Tayler Ramsay",
  description: "Learn more about Tayler Ramsay - Senior Full-Stack UX Engineer",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="max-w-4xl mb-16">
            <FadeIn>
              <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
                About Me
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-muted-foreground">
                {aboutData.bio[0]}
              </p>
            </FadeIn>
          </div>

          {/* Bento Grid */}
          <BentoGrid className="lg:grid-cols-4 mb-16">
            {/* Photo - Large */}
            <ScrollReveal className="md:col-span-2 lg:row-span-2">
              <BentoCard size="lg" className="h-full">
                <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-xl overflow-hidden bg-muted">
                  <Image
                    src="/assets/images/tayler-headshot.jpg"
                    alt="Tayler Ramsay"
                    fill
                    className="object-cover"
                  />
                </div>
              </BentoCard>
            </ScrollReveal>

            {/* Bio Card */}
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <BentoCard size="lg" className="h-full">
                <h2 className="font-display font-semibold text-2xl mb-4">
                  Hi, I'm Tayler
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  {aboutData.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </BentoCard>
            </ScrollReveal>

            {/* Currently */}
            <ScrollReveal delay={0.2}>
              <BentoCard className="h-full">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Currently</span>
                </div>
                <p className="font-semibold text-lg">
                  {aboutData.currentRole.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutData.currentRole.title}
                </p>
              </BentoCard>
            </ScrollReveal>

            {/* Location */}
            <ScrollReveal delay={0.3}>
              <BentoCard className="h-full">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Based in</span>
                </div>
                <p className="font-semibold text-lg">{aboutData.location}</p>
              </BentoCard>
            </ScrollReveal>

            {/* Tools */}
            <ScrollReveal delay={0.2} className="md:col-span-2">
              <BentoCard className="h-full">
                <h3 className="font-semibold mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 bg-muted text-sm font-medium rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal delay={0.3} className="lg:col-span-4">
              <BentoCard>
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-foreground/5 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal delay={0.4} className="md:col-span-2 lg:col-span-4">
              <BentoCard>
                <h3 className="font-semibold mb-6">Experience</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {aboutData.experience.map((exp) => (
                    <div key={exp.company}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {exp.type === "current"
                          ? "Currently"
                          : exp.type === "recent"
                          ? "Recently"
                          : "Previously"}
                      </p>
                      <p className="font-semibold">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.period}
                      </p>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </ScrollReveal>
          </BentoGrid>
        </div>
      </main>
      <Footer />
    </>
  );
}
