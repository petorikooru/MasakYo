import Apel from './Apel.jpg'
import SearchBar from '../component/searchbar';
import Menubar from '../component/manubar';
import {recipes} from '../assets/recipe';
import Carousel from '../component/carousel';


const Home = () => {
    return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background blur */}
      
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url(${Apel})`,
        }}
      />
      {/* Container untuk SearchBar dan Menubar */}
      <div className="relative z-10 flex items-start justify-start pl-12 pt-35 gap-20">
        {/* Bungkus SearchBar */}
        <div>
          <SearchBar Admin = {false} />
        </div>

        {/* Bungkus Menubar */}
        <div className="w-3/4 h-screen overflow-y-auto p-6 pb-40">
        <Carousel data={recipes} isAdmin = {false} />
      </div>
      </div>
    </div>
    );
}

export default Home