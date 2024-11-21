import MenuBar from "~/ui/landing/MenuBar";
import Footer from "~/ui/landing/Footer";
import { Card } from "~/components/ui/card";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const teamMembers = [
  {
    name: "James Dunseith",
    title: "Teacher, Developer and Facilitator",
    summary:
      "With experience in project-based learning and mastery-based grading, James contributes resilient, reusable components and deep learning design expertise.",
    image: "/images/team/james.webp",
  },
  {
    name: "Sebastian Pabon",
    title: "Educator, and Facilitator",
    summary:
      "Contributor to Catalyst, SWARM, LATAM Cardano; team member at Gimbalabs, MeshJS; Andamio co-founder; promotes global access to Cardano-based systems.",
    image: "/images/team/sebastian.webp",
  },
  {
    name: "Nelson Kshetrimayum",
    title: "Software Engineer",
    summary:
      "A Physics graduate with a focus on Python and Typescript, Nelson is passionate about open-source software and innovative educational structures.",
    image: "/images/team/nelson.webp",
  },
  {
    name: "HongJing (Jingles) K",
    title: "Innovative Solutions Developer",
    summary:
      "Specializing in NLP and machine learning, Jingles brings 10+ years in software development, focusing on analytics and user-centered solutions.",
    image: "/images/team/jingles.webp",
  },
  {
    name: "M. Ali Modiri",
    title: "Smart Contract Developer",
    summary:
      "A malware analyst and CIP 96 author, Ali’s expertise spans from assembly to high-level languages, focused on Plutus smart contract development.",
    image: "/images/team/mix.webp",
  },
  {
    name: "Roberto Mayen",
    title: "Product Manager",
    summary:
      "With 10 years in global project management, Roberto drives product strategy and impactful solutions for Andamio.",
    image: "/images/team/rmh.webp",
  },
  {
    name: "Adrian Hüetter",
    title: "Smart Contract Developer",
    summary:
      "A former civil engineer and Plutus pioneer, Adrian specializes in smart contracts and promotes open-source community growth.",
    image: "/images/team/adrian.webp",
  },
  {
    name: "Yoram Ben Zvi",
    title: "Business Models Lead",
    summary:
      "With 20+ years in tech strategy and partnerships, Yoram integrates impact-focused models, supporting sustainability in agriculture and Cardano ecosystems.",
    image: "/images/team/yoram.jpeg",
  },
  {
    name: "Nori Nishigaya",
    title: "Software Development Expert",
    summary:
      "A founder and Agile leader with 30+ years in software, Nori supports decentralized governance, inclusivity, and community-led collaboration.",
    image: "/images/team/nori.jpeg",
  },
];

export default function OurTeam() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <MenuBar />
      <main className="container mx-auto px-6 py-16 lg:px-24">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-black uppercase text-primary sm:text-6xl md:text-7xl">
            Our Team
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
            Meet the talented individuals driving Andamio forward.
          </p>
        </section>

        {/* Team Cards */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center space-y-4">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}'s profile picture`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-20 w-20 text-secondary" />
                )}
                <h4 className="text-lg font-bold text-primary">
                  {member.name}
                </h4>
                <h5 className="text-md h-10 text-center font-semibold text-muted-foreground">
                  {member.title}
                </h5>
                <p className="text-start text-sm font-light text-foreground">
                  {member.summary}
                </p>
              </div>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
