import Image from "next/image";

const steps = [
  {
    id: 1,
    backgroundImage: "/images/site/girlboss3.jpg",
    stepImage: "/images/site/step_1.png",
    altText: "CEO Sarah",
    heading: "Meet CEO Sarah",
    description:
      "Sarah needs to get some work done and is looking for a skilled contributor. She creates a course on Andamio.",
  },
  {
    id: 2,
    backgroundImage: "/images/site/skilledpete.jpg",
    stepImage: "/images/site/step_2.png",
    altText: "Skilled Pete",
    heading: "Meet Skilled Pete",
    description:
      "Pete is excited about the opportunity. He takes Sarah's course on Andamio and earns a skill.",
  },
  {
    id: 3,
    backgroundImage: "/images/site/pay.jpg",
    stepImage: "/images/site/step_3.png",
    altText: "Pete gets paid",
    heading: "Pete Gets Paid",
    description:
      "Pete does the job and gets paid. Pete learns a new skill and the process repeats.",
    comingSoon: true,
  },
];

function Step({
  backgroundImage,
  stepImage,
  altText,
  heading,
  description,
  comingSoon,
}) {
  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 grid max-w-md grid-cols-1 gap-4 p-6 text-white">
        <div className="flex flex-col items-center">
          <Image src={stepImage} alt={altText} width={200} height={200} />
          <h3 className="mt-4 text-3xl font-bold">{heading}</h3>
        </div>
        {comingSoon && (
          <h4 className="text-center text-2xl font-extrabold text-orange-500">
            COMING SOON
          </h4>
        )}
        <p className="mt-2 text-lg">{description}</p>
      </div>
    </div>
  );
}

export function HowAndamioWorks() {
  return (
    <section className="min-h-screen">
      {steps.map((step) => (
        <Step key={step.id} {...step} />
      ))}
    </section>
  );
}
