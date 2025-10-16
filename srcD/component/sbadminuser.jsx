import { Search } from "lucide-react";

// deklarasi komponen pakai const
const SearchBarAdminUser = ({Admin,onAddClick}) => {
    return (
    <div className="w-64 h-9 rounded-2xl p-5 bg-black/70 text-white backdrop-blur-md pb-70">
      {/* Search */}
        <div className="mb-6">
            <div className="flex items-center w-full rounded-lg bg-white px-3 py-2 shadow-sm">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                type="text"
                placeholder="Cari User"
                className="ml-2 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
            </div>
        </div>

        {/*ISI*/}
        <div className="mb-6">
            <p className="text-red-400 font-semibold">View User</p>
            <ul className="ml-4 mt-2 space-y-2 text-sm">
                <li className="text-red-400 font-bold cursor-pointer">• Alphabetical (A - Z)</li>
                <li className="hover:text-red-400 cursor-pointer">• Alphabetical (Z - A)</li>
                <li className="hover:text-red-400 cursor-pointer">• Date Registered (Newest)</li>
                <li className="hover:text-red-400 cursor-pointer">• Date Registered (Oldest)</li>
            </ul>
        </div>

        {/*button tambah*/}
        {Admin && (
        <button onClick={onAddClick} className="w-full py-2 rounded-full bg-red-600 hover:bg-red-700 font-semibold transition mb-6">
            Tambah
        </button>
        )}




    </div>
    );
};

export default SearchBarAdminUser;