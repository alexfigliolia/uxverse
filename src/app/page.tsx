"use client";
import { Banner, Login, LoginProvider } from "Layouts/Home";
import { Propless } from "Types/React";

export default function Home(_: Propless) {
  return (
    <LoginProvider>
      <main>
        <Banner />
        <Login />
      </main>
    </LoginProvider>
  );
}
