import { type GetServerSideProps } from "next";

// Redirect to consolidated about page
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/about#team",
      permanent: true,
    },
  };
};

export default function OurTeamRedirect() {
  return null;
}
