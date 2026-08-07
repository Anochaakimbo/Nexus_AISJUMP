import { redirect } from "next/navigation";

/** The walkthrough always starts at onboarding. */
export default function RootPage() {
  redirect("/onboarding");
}
