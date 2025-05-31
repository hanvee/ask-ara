import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/layout/ModeToggle";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl">Hello World</h1>
        <Button>Sentuh aku</Button>
        <ModeToggle />
      </main>
    </>
  );
}
