import DiscordIcon from "~/components/icons/discord";
import { signIn } from "next-auth/react";
// import { Button } from "~/components/ui/button";

export default function PageSignin({ redirectUrl }: { redirectUrl?: string }) {
  // todo: hardcode providers for now, because on vercel, it's not working
  const _providers = [
    {
      id: "discord",
      name: "Discord",
      type: "oauth",
    },
  ];

  return (
    <section className="bg-[url('/images/site/books-g771e712af_1280.jpg')] bg-cover">
      <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen">
        <div className="mb-6 flex items-center text-2xl font-semibold text-background drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Andamio Platform
        </div>
        <div className="w-full rounded-lg bg-foreground shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
              Connect to start
              <br />
              Learning and Contributing
            </h1>

            <div className="flex flex-col items-center gap-2">
              {Object.values(_providers).map((provider) => (
                //   <Button key={provider.name}>
                //     {provider.id === "discord" && <DiscordIcon  />}
                //    Sign in with {provider.name}
                // </Button>
                <div key={provider.name}>
                  <button
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: redirectUrl,
                      })
                    }
                    className="flex items-center rounded-lg border border-accent-foreground bg-foreground px-6 py-2 text-sm font-medium text-foreground shadow-md hover:bg-gray-200"
                  >
                    {provider.id === "discord" && <DiscordIcon />}
                    <span>Sign in with {provider.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
