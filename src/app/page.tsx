import { Banner, Login } from "Layouts/Home";
import { Propless } from "Types/React";

export default function Home(_: Propless) {
  return (
    <main>
      <Banner />
      <Login />
    </main>
  );
}
