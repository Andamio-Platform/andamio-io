import ProfileLayout from "./layout/ProfileLayout";
import LearnerComponent from "./roles/learner/LearnerComponent";

export default function LearnerPage() {
  return (
    <ProfileLayout>
      <LearnerComponent />
    </ProfileLayout>
  );
}
