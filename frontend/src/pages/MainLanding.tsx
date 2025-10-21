import HeaderbarLanding from "@components/headerbars/HeaderbarLanding";
import CoverHome from "@public/images/CoverHome.jpg";
import CoverAbout from "@public/images/CoverAbout.jpg";
import Sample1 from "@assets/images/Sample1.jpg";
import Sample2 from "@assets/images/Sample2.jpg";

export default function MainLanding() {
  return (
    <div className="relative">
      {/* Home Section */}
      <section id="home" className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${CoverHome})` }}>
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Headerbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <HeaderbarLanding />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col justify-center">
          {/* Text Content */}
          <div className="text-white mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-[25px] font-semibold mb-2">
              Selamat datang di
            </h2>
            <span className="block text-4xl md:text-6xl lg:text-[100px] font-extrabold bg-gradient-to-r from-[#B43739] to-[#FFAFAF] text-transparent bg-clip-text">
              MasakYo
            </span>
            <p className="mt-2 text-lg md:text-xl lg:text-[25px]">
              Temukan kuliner dunia
            </p>
          </div>

          {/* Polaroids Container */}
          <div className="relative w-full flex justify-center items-center lg:w-1/2 lg:absolute lg:right-8 lg:top-1/2 lg:transform lg:-translate-y-1/2">
            {/* Polaroid Landscape Daging */}
            <div className="relative transform -rotate-6 lg:-rotate-10 shadow-xl z-10 mx-4">
              <img
                src={Sample1}
                alt="Daging"
                className="w-40 h-64 md:w-48 md:h-72 lg:w-64 lg:h-96 xl:w-80 xl:h-120 object-cover rounded-lg border-4 lg:border-5 border-white"
              />
            </div>

            {/* Polaroid Portrait Telur */}
            <div className="relative transform rotate-6 lg:rotate-12 shadow-xl z-20 mx-4">
              <img
                src={Sample2}
                alt="Telur"
                className="w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-64 xl:w-64 xl:h-80 object-cover rounded-lg border-4 lg:border-5 border-white"
              />
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="absolute bottom-6 w-full text-center z-10">
          <p className="text-white text-sm md:text-lg">Learn More</p>
          <span className="block text-white animate-bounce">⌄</span>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${CoverAbout})` }}>
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/30 to-transparent z-10"></div>

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
            {/* Text Content */}
            <div className="text-white order-2 lg:order-1">
              <span className="block text-4xl md:text-5xl lg:text-[70px] font-extrabold bg-gradient-to-r from-[#FF5A5A] to-[#FFAFAF] text-transparent bg-clip-text mb-6">
                About Us
              </span>
              <div className="space-y-4 text-sm md:text-base lg:text-lg leading-relaxed">
                <p>
                  <span className="font-bold">MasakYo</span> hadir sebagai teman
                  memasak Anda di rumah. Berasal dari kata "Ayo Masak",
                  <span className="font-bold"> MasakYo</span> mengajak semua orang
                  untuk menciptakan hidangan yang lezat, menarik, dan praktis, tanpa
                  harus bingung mulai dari mana.
                </p>
                <p>
                  Di sini, kami menyediakan beragam resep pilihan dari berbagai
                  kategori, mulai dari masakan lokal khas Nusantara, hidangan Western,
                  hingga minuman segar (Beverages). Semua disusun agar mudah diikuti
                  oleh siapa saja, baik pemula maupun yang sudah handal di dapur.
                </p>
              </div>
            </div>

            {/* Polaroids Container */}
            <div className="relative h-48 md:h-64 lg:h-96 order-1 lg:order-2 flex justify-center items-center mb-8 lg:mb-0">
              {/* Polaroid Landscape Daging */}
              <div className="relative transform -rotate-6 lg:-rotate-10 shadow-xl z-10 mx-2 md:mx-4">
                <img
                  src={Sample1}
                  alt="Daging"
                  className="w-32 h-48 md:w-48 md:h-72 lg:w-80 lg:h-120 object-cover rounded-lg border-4 lg:border-5 border-white"
                />
              </div>

              {/* Polaroid Portrait Telur */}
              <div className="relative transform rotate-6 lg:rotate-12 shadow-xl z-20 mx-2 md:mx-4">
                <img
                  src={Sample2}
                  alt="Telur"
                  className="w-24 h-32 md:w-40 md:h-48 lg:w-64 lg:h-80 object-cover rounded-lg border-4 lg:border-5 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}