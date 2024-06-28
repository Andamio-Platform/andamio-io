import { DecodedCourseStateDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";
import useCourseStateDatum from "../../hooks/onchain/useCourseStateDatum";

export default function CompletedAssignments({
  courseNftPolicy,
  alias,
}: {
  courseNftPolicy: string;
  alias: string;
}) {
  const {
    courseStateDatum,
    isLoadingCourseStateDatum,
    isErrorCourseStateDatum,
    errorCourseStateDatum,
  } = useCourseStateDatum(courseNftPolicy, alias);

  return (
    <>
      {courseStateDatum &&
        courseStateDatum.CompletedAssignments.map((c, i) => (
          <div key={i}>
            <h3>Completed Assignments</h3>
            <p key={i}>{c}</p>
          </div>
        ))}
    </>
  );
}
