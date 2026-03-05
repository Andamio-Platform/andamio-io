import { GetServerSideProps } from "next";

// Redirect to consolidated about page
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/about#technology",
      permanent: true,
    },
  };
};

export default function OurTechnologyRedirect() {
  return null;
}
