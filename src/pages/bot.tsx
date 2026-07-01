import Metatags from "~/components/site/metatags";
import AndamioBot from "~/ui/system/AndamioBot";

export default function BotPage() {
  return (
    <>
      <Metatags
        title="Andamio Bot"
        description="AndamioBot credential-gates your Discord: it reads members' on-chain Andamio credentials and grants roles based on what they hold — with no wallet handling for you or your members."
      />
      <AndamioBot />
    </>
  );
}
