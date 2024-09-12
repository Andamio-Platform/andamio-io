import { Card, CardContent, CardHeader } from "~/components/ui/card";
import ProfileLayout from "./layout/ProfileLayout";
import AdminCreateCourseInstanceStepOne from "~/components/transactions/dialogs/AdminCreateCourseInstanceStepOne";
import AdminCreateCourseInstanceStepTwo from "~/components/transactions/dialogs/AdminCreateCourseInstanceStepTwo";
import { CardanoWallet } from "@meshsdk/react";
import AdminCreateCourseInstanceStepThree from "~/components/transactions/dialogs/AdminCreateCourseInstanceStepThree";
import AdminAddTeacherDialog from "~/components/transactions/dialogs/AdminAddTeacherDialog";
import AdminRemoveTeacherDialog from "~/components/transactions/dialogs/AdminRemoveTeacherDialog";

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
        <Card>
          <CardHeader>Deploy Course</CardHeader>
          <CardContent>
            <AdminCreateCourseInstanceStepThree />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Add Teacher to Course</CardHeader>
          <CardContent>
            <AdminAddTeacherDialog />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Remove Teacher from Course</CardHeader>
          <CardContent>
            <AdminRemoveTeacherDialog />
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
}
