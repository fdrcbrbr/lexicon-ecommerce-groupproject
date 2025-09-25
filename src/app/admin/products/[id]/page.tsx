interface ProductUpdatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductUpdatePage({ params }: ProductUpdatePageProps) {
  const { id } = await params;

  return (
    <div className="p-8">
      <p>Product Update Page</p>
      <p>Updating: {id}</p>
    </div>
  );
}