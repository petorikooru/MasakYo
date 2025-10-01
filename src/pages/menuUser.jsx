import HeaderBarUser from "../components/headerbarUser";
import Sidebar from "../components/sidebar";
import ResepCard from "../components/ResepCard";

import sample_image from "../assets/images/food_sample.png"
import user_image from "../assets/images/user_image.jpg"

export default function MenuUser() {
  return (
    <div className="min-h-screen bg-[url('{user_image}')] relative"
            style={{ 
                backgroundImage: `url(${user_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
      }}
    >
      <HeaderBarUser />

      <div className="flex p-4 space-x-4">
        <Sidebar
          menuData={[
            {
              title: "For You",
              submenu: [
                { label: "All Recipes", active: true },
                { label: "Nusantara Only" },
                { label: "Western Only" },
                { label: "Beverages Only" },
              ],
            },
            { title: "Currently Trending" },
            { title: "Nusantara Culinary" },
            { title: "Western Culinary" },
            { title: "Beverages" },
          ]}
        />

        <div className="flex-1">
          <ResepCard
            title="Rendang"
            category="Nusantara"
            description="Rendang adalah hidangan lauk pauk yang berasal dari Minangkabau, Indonesia dengan bahan dasar daging sapi..."
            imgUrl={sample_image}
            difficulty={4}
            taste={5}
          />
          <ResepCard
            title="Sate Ayam"
            category="Nusantara"
            description="Sate ayam adalah makanan khas Indonesia yang berupa daging ayam yang dipotong kecil-kecil lalu ditusuk dan dipanggang..."
            imgUrl={sample_image}
            difficulty={3}
            taste={5}
          />
        </div>
      </div>
    </div>
  );
}
