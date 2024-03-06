export default async function AboutPage() {
  return (
    <main className="items-center justify-center text-4xl" style={{ minHeight: "calc(100vh - 5rem)" }}>
      <div className="card bg-primary text-primary-content font-mono shadow-xl z-10 p-5">
        <h1 className="py-10">Welcome to Andamio!</h1>
        <p className="text-lg font-medium py-3">
          Andamio is a new kind of platform for learning and contribution management. It is built to enable people to onboard and contribute to collaborative projects so that they can make a meaningful impact. We envision a future where work is defined and delivered in ways that achieve the highest levels of human collaboration.
        </p>
        <p className="text-lg font-medium py-3">
          Andamio consists of a learning-management platform and a contribution-management platform that work together to create unique pathways for organizations and contributors to align on meaningful work. It uses the Cardano blockchain to provide non-custodial ways for people to build a record of learning and contribution, and it allows organizations to collaborate in solving important problems.
        </p>
        <p className="text-lg font-medium py-3">
          After prototyping and testing Andamio in 2023, we are now building Andamio for production deployment. Stay tuned for updates as Andamio continues to roll out.
        </p>
      </div>
    </main>
  );
}
