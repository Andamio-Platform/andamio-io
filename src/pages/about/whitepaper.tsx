import { type GetServerSideProps } from "next";

// Redirect the legacy /about/whitepaper path to the papers hub.
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/papers",
      permanent: true,
    },
  };
};

export default function WhitepaperRedirect() {
  return null;
}
