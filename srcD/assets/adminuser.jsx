import Apel from './Apel.jpg';
import SearchBarAdminUser from '../component/sbadminuser';
import HeaderbarAdmin from '../../src/components/HeaderbarAdmin';
import AddUserr from '../component/adduserterbang';
import { useState } from "react";
import { users as userData } from "../component/usersdata";
import UserCarousel from "../component/UserCarousel";

const AdminUser = () => {
  const [showAddUser, setShowUser] = useState(false);
  const [users, setUsers] = useState(userData);
  const [confirmDelete, setConfirmDelete] = useState(null); // <-- nama user yang mau dihapus

  const handleDeleteClick = (name) => {
    setConfirmDelete(name); // tampilkan popup
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      setUsers(users.filter((user) => user.name !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url(${Apel})`,
        }}
      />

      <HeaderbarAdmin />

      {/* Container untuk SearchBar dan UserCarousel */}
      <div className="relative z-10 flex items-start justify-start pl-12 pt-35 gap-20">
        <div>
          <SearchBarAdminUser Admin={true} onAddClick={() => setShowUser(true)} />
        </div>

        {showAddUser && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
            <div className="w-11/12 h-[90%] overflow-y-auto bg-black/1 rounded-2xl p-6">
              <AddUserr onClose={() => setShowUser(false)} />
            </div>
          </div>
        )}

        <div className="flex-1 flex justify-center items-start w-full">
          <div className="w-11/12 max-w-5xl mt-1 mb-20 mr-45">
            <UserCarousel data={users} onDelete={handleDeleteClick} />
          </div>
        </div>
      </div>

      {/* Popup Konfirmasi */}
      {confirmDelete && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-pink-200 to-pink-300 text-brown-900 p-6 rounded-2xl shadow-xl text-center">
            <p className="text-lg font-semibold mb-4 text-brown-800">
              Apakah kamu yakin menghapus akun ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                Ya
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;