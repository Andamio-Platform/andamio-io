import { api } from "~/utils/api";

// Maybe it's only this with no module on its own...?

export default function useModuleVariant(moduleId: string | undefined) {
  const { data: module, isLoading } = api.module.getModule.useQuery(
    {
      moduleId: moduleId ? moduleId : "",
    },
    {
      enabled: !!moduleId,
    },
  );

  return { module, isLoading };
}
