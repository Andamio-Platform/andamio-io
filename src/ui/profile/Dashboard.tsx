import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ProfileLayout from "./layout/ProfileLayout";
import LearnerComponent from "./LearnerComponent";
import CreatorComponent from "./CreatorComponent";
import ContributionComponent from "./ContributionComponent";
import GoalsComponent from "./GoalsComponent";
import DashboardHomeComponent from "./DashboardHomeComponent";
import Footer from "../landing/Footer";

export default function DashboardPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <Tabs defaultValue="dashboard" className="min-h-[75vh] w-full">
        <TabsList className="mb-3 w-full gap-24 rounded-none bg-primary font-beckman text-lg text-primary-foreground">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="learner">Learners</TabsTrigger>
          <TabsTrigger value="creator">Creators</TabsTrigger>
          <TabsTrigger value="contribution">Contribtors</TabsTrigger>
          <TabsTrigger value="goals">Your Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <DashboardHomeComponent />
        </TabsContent>
        <TabsContent value="learner">
          <LearnerComponent />
        </TabsContent>
        <TabsContent value="creator">
          <CreatorComponent />
        </TabsContent>
        <TabsContent value="contribution">
          <ContributionComponent />
        </TabsContent>
        <TabsContent value="goals">
          <GoalsComponent />
        </TabsContent>
      </Tabs>
      <Footer />
    </ProfileLayout>
  );
}
