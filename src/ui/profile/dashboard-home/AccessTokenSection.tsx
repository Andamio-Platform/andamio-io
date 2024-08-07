export default function AccessTokenSection({ alias }: { alias: string }) {
  return (
    <div className="text-center">
      <h2 className="py-5 text-xl font-bold">Andamio Access Token</h2>
      <p className="pt-5 text-lg">
        <b>{alias}</b>
      </p>
      <p className="text-sm font-light">YOUR UNIQUE TOKEN ALIAS</p>
    </div>
  );
}
