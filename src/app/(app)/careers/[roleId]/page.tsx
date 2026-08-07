import { notFound } from "next/navigation";
import { CareerDetail } from "@/features/careers/CareerDetail";
import { jobMatches } from "@/data/careers";

export function generateStaticParams() {
  return jobMatches.map((job) => ({ roleId: job.id }));
}

// `params` is a Promise in Next 16 — synchronous access was removed.
export default async function CareerDetailPage(
  props: PageProps<"/careers/[roleId]">,
) {
  const { roleId } = await props.params;
  const job = jobMatches.find((candidate) => candidate.id === roleId);

  if (!job) notFound();

  return <CareerDetail job={job} />;
}
