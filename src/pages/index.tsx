import { useEffect, useState } from "react";
import PageCourse from "~/ui/course/[coursecode]/PageCourse";
import PageLanding from "~/ui/landing/PageLanding";
import { api } from "~/utils/api";

export default function Landing() {
  const [host, setHost] = useState<undefined | string>(undefined);

  const { data: client } = api.clientDomains.getCourseCodeFromHost.useQuery(
    {
      host: host!,
    },
    {
      enabled: host !== undefined,
    },
  );

  useEffect(() => {
    const host = window.location.host;
    setHost(host);
  }, []);

  return (
    <>
      {client !== undefined && (
        <>
          {client ? <PageCourse courseId={client.courseId} /> : <PageLanding />}
        </>
      )}
    </>
  );
}
