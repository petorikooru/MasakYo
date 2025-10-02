import Headerbar from "../components/headerbar";

export default function About() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/utama.jpg')" }} // background image
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="fixed top-0 left-0 w-full z-50">
        <Headerbar />
      </div>

      {/* Teks About Us */}
      <div className="relative z-10 flex flex-col md:flex-row items-start px-10 md:px-20 py-28 gap-x-20">

        <div className="max-w-2xl text-white">
          <span className="block text-[70px] font-extrabold bg-gradient-to-r from-[#FF5A5A] to-[#FFAFAF] text-transparent bg-clip-text">About Us</span>
          <p className="mb-4 text-lg leading-relaxed">
            <span className="font-bold">MasakYo</span> hadir sebagai teman
            memasak Anda di rumah. Berasal dari kata “Ayo Masak”,
            <span className="font-bold"> MasakYo</span> mengajak semua orang
            untuk menciptakan hidangan yang lezat, menarik, dan praktis, tanpa
            harus bingung mulai dari mana.
          </p>
          <p className="text-lg leading-relaxed">
            Di sini, kami menyediakan beragam resep pilihan dari berbagai
            kategori, mulai dari masakan lokal khas Nusantara, hidangan Western,
            hingga minuman segar (Beverages). Semua disusun agar mudah diikuti
            oleh siapa saja, baik pemula maupun yang sudah handal di dapur.
          </p>
        </div>

         <div className="relative mt-10 md:mt-0">
          {/* Foto 1 */}
          <div className="absolute top-0 right-0 transform rotate-2 shadow-2xl">
            <div className="bg-white p-2">
              <img
                src="/foto1.jpg"
                alt="Foto1"
                className="w-64 h-72 object-cover"
              />
            </div>
          </div>

          {/* Foto 2 */}
          <div className="absolute top-44 right-20 transform -rotate-6 shadow-2xl">
            <div className="bg-white p-2">
              <img
                src="/telur.jpg"
                alt="Telur"
                className="w-56 h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}