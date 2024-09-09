import { Card, CardContent, CardHeader } from "~/components/ui/card";
import ProfileLayout from "./layout/ProfileLayout";
import AdminCreateCourseInstanceStepOne from "~/components/transactions/dialogs/AdminCreateCourseInstanceStepOne";
import AdminCreateCourseInstanceStepTwo from "~/components/transactions/dialogs/AdminCreateCourseInstanceStepTwo";
import { CardanoWallet } from "@meshsdk/react";

export default function AdminPage() {
  return (
    <ProfileLayout>
      <div className="mx-auto grid w-11/12 grid-cols-1 gap-10">
        <CardanoWallet />
        <Card>
          <CardHeader>Mint Course NFT with list of Contributors</CardHeader>
          <CardContent>
            <AdminCreateCourseInstanceStepOne />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Deploy Reference Scripts</CardHeader>
          <CardContent>
            <AdminCreateCourseInstanceStepTwo />
          </CardContent>
        </Card>
        <Card>Deploy reference scripts</Card>
        <Card>Add ref scripts to ref input + mint course instance</Card>
      </div>
    </ProfileLayout>
  );
}
