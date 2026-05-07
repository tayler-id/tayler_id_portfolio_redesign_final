import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects, getProjectBySlug } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Tayler Ramsay`,
    description: project.description,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get prev/next projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  return (
    <>
      <Header />
      <main>
        <CaseStudyPage
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </main>
      <Footer />
    </>
  );
}
