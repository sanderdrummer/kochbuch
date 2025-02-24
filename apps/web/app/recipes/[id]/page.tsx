export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const resolvedParameters = await params;
  const id = resolvedParameters.id;
  return <div>{id}</div>;
}
