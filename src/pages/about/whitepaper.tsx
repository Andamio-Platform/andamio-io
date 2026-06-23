import { GetServerSideProps } from "next";

// Redirect the legacy /about/whitepaper path to the internal /whitepaper route.
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/whitepaper",
      permanent: true,
    },
  };
};

export default function WhitepaperRedirect() {
  return null;
}
