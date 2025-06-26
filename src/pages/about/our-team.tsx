import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { UserIcon } from "@heroicons/react/24/outline";

const teamMembers = [
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
    name: "James Dunseith",
    title: "Teacher, Developer and Facilitator",
    summary:
      "With experience in project-based learning and mastery-based grading, James contributes resilient, reusable components and deep learning design expertise.",
    image: "/images/team/james.webp",
  },
  {
    name: "HongJing (Jingles) K",
    title: "Innovative Solutions Developer",
    summary:
      "Specializing in NLP and machine learning, Jingles brings 10+ years in software development, focusing on analytics and user-centered solutions.",
    image: "/images/team/jingles.webp",
  },
  {
    name: "Nelson Kshetrimayum",
    title: "Full-Stack Developer",
    summary:
      "A Physics graduate turned Cardano developer, Nelson is passionate about open-source software and innovative educational structures.",
    image: "/images/team/nelson.webp",
  },
  {
    name: "Roberto Mayen",
    title: "Product Manager",
    summary:
      "With 10 years in global project management, Roberto drives product strategy and impactful solutions for Andamio.",
    image: "/images/team/rmh.webp",
  },
  {
    name: "M. Ali Modiri",
    title: "Smart Contract Developer",
    summary:
      "A malware analyst and CIP 96 author, Ali's expertise spans from assembly to high-level languages, focused on Plutus smart contract development.",
    image: "/images/team/mix.webp",
  },
  {
    name: "Nori Nishigaya",
    title: "Software Development Expert",
    summary:
      "A founder and Agile leader with 30+ years in software, Nori supports decentralized governance, inclusivity, and community-led collaboration.",
    image: "/images/team/nori.jpeg",
  },
  {
    name: "Sebastian Pabon",
    title: "Educator and Facilitator",
    summary:
      "Gimbalabs educator and facilitator, Andamio founding member, MeshJS contributor. Open Source advocate",
    image: "/images/team/sebastian.webp",
  },
];

export default function OurTeam() {
  return (
    <ModernPageLayout
      title="Founding Team"
      description="Our diverse team combines expertise in education, blockchain development, product management, and community building. Together, we're creating the infrastructure for trust-based distributed work."
      currentPage="about"
    >
      <div className="mx-auto pb-20">
        {/* Team Introduction */}

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => {
            // Assign colors based on index
            const colors = [
              {
                primary: "blue",
                gradient: "from-blue-500 to-blue-600",
                overlayGradient:
                  "from-blue-900/90 via-blue-800/50 to-transparent",
                overlayGradient2: "from-blue-900/40 to-transparent",
                textColor: "text-blue-100",
                accentColor: "bg-blue-400",
                hoverOverlay: "bg-blue-900/20",
                shadow: "hover:shadow-blue-500/10",
              },
              {
                primary: "green",
                gradient: "from-green-500 to-green-600",
                overlayGradient:
                  "from-green-900/90 via-green-800/50 to-transparent",
                overlayGradient2: "from-green-900/40 to-transparent",
                textColor: "text-green-100",
                accentColor: "bg-green-400",
                hoverOverlay: "bg-green-900/20",
                shadow: "hover:shadow-green-500/10",
              },
              {
                primary: "purple",
                gradient: "from-purple-500 to-purple-600",
                overlayGradient:
                  "from-purple-900/90 via-purple-800/50 to-transparent",
                overlayGradient2: "from-purple-900/40 to-transparent",
                textColor: "text-purple-100",
                accentColor: "bg-purple-400",
                hoverOverlay: "bg-purple-900/20",
                shadow: "hover:shadow-purple-500/10",
              },
              {
                primary: "orange",
                gradient: "from-orange-500 to-orange-600",
                overlayGradient:
                  "from-orange-900/90 via-orange-800/50 to-transparent",
                overlayGradient2: "from-orange-900/40 to-transparent",
                textColor: "text-orange-100",
                accentColor: "bg-orange-400",
                hoverOverlay: "bg-orange-900/20",
                shadow: "hover:shadow-orange-500/10",
              },
              {
                primary: "cyan",
                gradient: "from-cyan-500 to-cyan-600",
                overlayGradient:
                  "from-cyan-900/90 via-cyan-800/50 to-transparent",
                overlayGradient2: "from-cyan-900/40 to-transparent",
                textColor: "text-cyan-100",
                accentColor: "bg-cyan-400",
                hoverOverlay: "bg-cyan-900/20",
                shadow: "hover:shadow-cyan-500/10",
              },
              {
                primary: "pink",
                gradient: "from-pink-500 to-pink-600",
                overlayGradient:
                  "from-pink-900/90 via-pink-800/50 to-transparent",
                overlayGradient2: "from-pink-900/40 to-transparent",
                textColor: "text-pink-100",
                accentColor: "bg-pink-400",
                hoverOverlay: "bg-pink-900/20",
                shadow: "hover:shadow-pink-500/10",
              },
            ];
            const colorScheme = colors[index % colors.length];

            return (
              <div key={index} className="group relative">
                <div
                  className={`absolute -inset-0.5 rounded-sm bg-gradient-to-r ${colorScheme?.gradient} opacity-30 blur transition duration-500 group-hover:opacity-50`}
                ></div>
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-sm border border-white/20 bg-gray-900 shadow-2xl transition-all duration-500 ${colorScheme?.shadow}`}
                >
                  {/* Background image */}
                  {member.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${member.image})`,
                      }}
                    ></div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <UserIcon className="h-24 w-24 text-gray-400" />
                    </div>
                  )}

                  {/* Overlay gradients */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${colorScheme?.overlayGradient}`}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${colorScheme?.overlayGradient2}`}
                  ></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <div
                        className={`h-0.5 w-16 ${colorScheme?.accentColor}`}
                      ></div>
                      <p
                        className={`text-sm font-semibold ${colorScheme?.textColor}`}
                      >
                        {member.title}
                      </p>
                      <p
                        className={`text-sm leading-relaxed ${colorScheme?.textColor}`}
                      >
                        {member.summary}
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 ${colorScheme?.hoverOverlay} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="rounded-sm border border-white/20 bg-gray-800/50 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Join Our Team
            </h3>
            <p className="mb-6 text-gray-300">
              Interested in contributing to the future of distributed work?
              We're always looking for passionate individuals.
            </p>
            <a
              href="mailto:careers@andamio.io"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-blue-600 px-6 py-3 text-white transition-all duration-200 hover:bg-blue-700"
            >
              <span>Get in Touch</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}
