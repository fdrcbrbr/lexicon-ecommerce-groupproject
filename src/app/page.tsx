import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="grid justify-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-black font-black my-8">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center"></div>
      </div>
    </div>
  );
}
