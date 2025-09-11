import Image from "next/image";
export default function Hero() {
  return (
    <div>
      <section className="w-full bg-[#F2F0F1] sd:h-[70vh] md:h-[100vh] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-hidden">
          <div className="flex flex-col md:flex-row items-center w-full h-full overflow-hidden">
            <div className="w-full md:w-1/2 space-y-6 p-4 overflow-hidden">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-black leading-none text-left">
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xs md:max-w-md text-left">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <div className="text-left">
                <button className="bg-black text-white px-6 md:px-12 py-3 rounded-full hover:bg-gray-800 transition-colors w-40 md:w-auto">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center h-64 md:h-full relative overflow-hidden">
              <Image
                src="/hero-image.jpg"
                alt="Couple wearing stylish clothes"
                fill
                className="md:object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="h-[10vh] bg-black"></div>
    </div>
  );
}