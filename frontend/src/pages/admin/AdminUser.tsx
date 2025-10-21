import { useState, useEffect, useMemo } from "react";
import { Users, Trash2, Search } from "lucide-react";
import HeaderbarAdmin from '@components/headerbars/HeaderbarAdmin';
import usersData from '@/data/users.json';

import CoverAdmin from '@public/images/CoverAdmin.jpg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: "active" | "inactive";
  avatar?: string;
}

// Transform the JSON data to match our User interface
const transformUserData = (jsonUsers: any[]): User[] => {
  return jsonUsers.map((user, index) => ({
    id: index + 1,
    name: user.name,
    email: user.email,
    role: "User", // All users have "User" role
    joinDate: user.registered,
    status: "active" as const,
    avatar: user.avatar
  }));
};

export default function AdminUser() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>(() => transformUserData(usersData.users || usersData));
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const usersPerPage = 6;

  // Use useMemo to prevent recreation on every render
  const allUsers = useMemo((): User[] => {
    return users;
  }, [users]);

  // Filter users based on search
  useEffect(() => {
    let filtered = [...allUsers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by join date (newest first)
    filtered = filtered.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [allUsers, searchTerm]);

  // Calculate current page users
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (userId: number): void => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setConfirmDelete(user.name);
    }
  };

  const handleConfirmDelete = (): void => {
    if (confirmDelete) {
      setUsers(prev => prev.filter((user) => user.name !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = (): void => {
    setConfirmDelete(null);
  };

  const handleResetSearch = (): void => {
    setSearchTerm("");
  };

  const getAdminStats = () => {
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(user => user.status === "active").length;

    return {
      total: totalUsers,
      filtered: filteredUsers.length,
      active: activeUsers,
    };
  };

  const stats = getAdminStats();

  const renderUserCard = (user: User) => (
    <div key={user.id} className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-400/20 hover:border-red-400/40 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <Users className="text-red-400" size={24} />
            </div>
          )}
          <div>
            <h3 className="text-white font-semibold text-lg">{user.name}</h3>
            <p className="text-red-300 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => handleDeleteClick(user.id)}
          className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-red-300 text-sm">Role</span>
          <span className="px-3 py-1 bg-blue-500/30 rounded-full text-xs font-medium text-blue-300">
            User
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-red-300 text-sm">Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.status === "active" 
              ? "bg-green-500/30 text-green-300" 
              : "bg-neutral-500/30 text-neutral-300"
          }`}>
            {user.status}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-red-300 text-sm">Join Date</span>
          <span className="text-white text-sm">{new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-neutral-900">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${CoverAdmin})` }}
      />

      {/* Content Container */}
      <div className="relative lg:px-8 lg:py-6 px-4 py-24">
        <HeaderbarAdmin />
        
        {/* Main Content Area */}
        <div className="mt-7 lg:mt-25">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-3xl p-6 lg:p-8 border border-red-400/20 backdrop-blur-sm mb-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-red-400" size={28} />
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    User Management
                  </h1>
                </div>
                <p className="text-red-200 text-base lg:text-lg">
                  {searchTerm
                    ? `Menampilkan ${stats.filtered} pengguna berdasarkan pencarian` 
                    : "Kelola dan pantau semua pengguna dalam sistem"
                  }
                </p>
                
                {/* Search Term Display */}
                {searchTerm && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-red-500/30 border border-red-400/50 rounded-full text-red-200 text-sm flex items-center gap-2">
                        Search: "{searchTerm}"
                        <button 
                          onClick={handleResetSearch}
                          className="text-red-300 hover:text-white ml-1"
                        >
                          ×
                        </button>
                      </span>
                    </div>
                    <button
                      onClick={handleResetSearch}
                      className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors text-sm"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-red-300 text-sm font-semibold">
                    Total Users
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stats.total}
                  </div>
                </div>
                <div>
                  <div className="text-red-300 text-sm font-semibold">
                    Active
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stats.active}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-4 text-sm text-red-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>{stats.filtered} pengguna tersedia • {Math.min(usersPerPage, currentUsers.length)} pengguna per halaman</span>
              </div>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Pencarian aktif</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-400/20 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-700/50 border border-red-400/30 rounded-xl text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Users Grid */}
          {currentUsers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUsers.map(renderUserCard)}
              </div>
              
              {/* Pagination */}
              {filteredUsers.length > usersPerPage && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-red-200 text-sm">
                    Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                    className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Results Message */
            <div className="text-center py-12">
              <div className="text-red-300 text-lg font-semibold mb-4">
                Tidak ada pengguna yang sesuai
              </div>
              <p className="text-red-200 mb-6">
                {searchTerm 
                  ? "Tidak ada pengguna yang sesuai dengan pencarian Anda" 
                  : "Tidak ada pengguna yang terdaftar dalam sistem"
                }
              </p>
              {searchTerm && (
                <button
                  onClick={handleResetSearch}
                  className="px-6 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-red-400/10 to-red-600/10 border border-red-400/20 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center max-w-sm mx-4">
            <Trash2 className="mx-auto mb-4 text-red-400" size={32} />
            <p className="text-lg font-semibold mb-4 text-white">
              Apakah kamu yakin menghapus akun ini?
            </p>
            <p className="text-red-200 mb-6">
              User: <span className="font-semibold text-white">{confirmDelete}</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Ya
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-neutral-600 text-white rounded-xl hover:bg-neutral-700 transition-colors"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}