import { GetServerSideProps } from "next";

// Redirect to external whitepaper on docs site
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "https://docs.andamio.io/docs/whitepaper",
      permanent: true,
    },
  };
};

export default function WhitepaperRedirect() {
  return null;
}
