export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query, section, category, page, filter } = await searchParams;

  return (

      <div className="h-full mx-8 border-t-[2px] border-t-[#F0F0F0]">
        
      </div>

  );
}
