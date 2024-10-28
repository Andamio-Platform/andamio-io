import { Card } from "~/components/ui/card";

export default function PlaceholderComponent({ name }: { name: string }) {
  return (
    <Card className="mx-auto my-5 flex h-full min-h-48 w-11/12 items-center justify-center">
      <p>{name}</p>
    </Card>
  );
}
