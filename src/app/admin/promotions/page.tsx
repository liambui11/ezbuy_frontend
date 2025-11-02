// src/app/admin/promotions/page.tsx (CẬP NHẬT MÀU CHỮ TRONG tableData)
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Loader2, Calendar, Clock, Trash2 } from 'lucide-react';
import { AdminTable } from '@/components/admin/AdminTable';
import { fetchPromotions } from '@/features/promotions/services';
import { Promotion } from '@/features/promotions/types';
import { format, isFuture, isPast } from 'date-fns';
import { useRouter } from "next/navigation";
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';
import { FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';

import { axiosInstance } from '@/utils/axiosInstance';


const getStatusDisplay = (promo: Promotion) => {
    if (promo.active === 0 || (promo.endDate && isPast(promo.endDate))) {
        return { text: 'Disabled', class: 'bg-danger' };
    }
    if (promo.startDate && isFuture(promo.startDate)) {
        return { text: 'Upcoming', class: 'bg-primary-200' }; 
    }
    return { text: 'Active', class: 'bg-success' };
}

export default function PromotionListPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [search,setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<'all' | 'happening' | 'ended'>('all');

  const filteredPromotions = promotions.filter(promo => {
    const ended = promo.endDate && new Date(promo.endDate) < new Date();
    if (filterStatus === 'happening') {
      return !ended;
    }
    if (filterStatus === 'ended') {
      return ended;
    }
    return true;
  });

  const handleDelete = async (promoId: number, promoCode: string) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete promotion code "${promoCode}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
  
    if (!confirmResult.isConfirmed) return;
  
    try {
      const response = await axiosInstance.delete(
        `http://localhost:8081/api/promotions/${promoId}`
      );
      if (response.status === 200 || response.status === 204) {
        Swal.fire('Deleted!', 'Promotion deleted successfully.', 'success');
        setPromotions((prev) => prev.filter((p) => p.id !== promoId));
      } else {
        Swal.fire('Failed!', 'Failed to delete promotion.', 'error');
      }
    } catch (error: any) {
      console.error("Error deleting promotion:", error.response?.data || error.message);
      Swal.fire('Error!', 'An error occurred while deleting promotion.', 'error');
    }
  };
  

  const loadData = async (keyword?: string) =>{
    try{
      const data = await fetchPromotions(keyword);
      setPromotions(data);
    }catch(error){
      console.error("Lỗi khi tải khuyến mãi:", error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(()=>{
    loadData();
  },[])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadData(search.trim());
  };

  const tableHeaders = ['Code', 'Description', 'Value', 'Timeframe', 'Status','Actions'];

  const tableData = promotions.map(promo => {
    const statusDisplay = getStatusDisplay(promo);
    return [
        // CODE: Màu Primary (Xanh thương hiệu)
        <span className="font-mono text-primary font-extrabold">{promo.code || 'Auto'}</span>,
        
        // DESCRIPTION: Chữ bình thường nhưng hơi đậm
        <span className="text-foreground break-words whitespace-normal max-w-[300px]">{promo.description}</span>,
        
        // VALUE: Màu Success (Xanh lục) và đậm
        <span className="font-bold text-success">{promo.discountValue}%</span>,
        
        // TIMEFRAME
        <div className="flex flex-col text-sm space-y-1">
            <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Start: {promo.startDate ? format(promo.startDate, 'MM/dd/yyyy') : 'N/A'}
            </span>
            <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                End: {promo.endDate ? format(promo.endDate, 'MM/dd/yyyy') : 'N/A'}
            </span>
        </div>,
        
        // STATUS
        <div className="p-1">
          <span
            className={`rounded-lg font-semibold ${
              promo.endDate && new Date(promo.endDate) < new Date()
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {promo.endDate && new Date(promo.endDate) < new Date()
              ? "Ended"
              : "Happening"}
          </span>
        </div>,
        
        // ACTIONS
        <div className="flex space-x-2">
            {/* Edit Button */}
            <Link 
                href={`/admin/promotions/editpromotions/${promo.id}`} 
                className="text-primary hover:text-primary-700 p-1 rounded-full hover:bg-primary-200"
                title="Edit"
            >
              <Edit className="w-5 h-5" />
            </Link>
            
            {/* Delete Button */}
            <button
                onClick={() => handleDelete(promo.id, promo.code || `#${promo.id}`)}
                className="hover:text-danger-700 p-1 rounded-full hover:bg-danger/5"
                title="Delete"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    ];
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-primary">Promotion Management</h2>

        <form onSubmit={handleSearch} className="flex justify-center items-center">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border border-r-0 border-primary-400 p-1 rounded-l-xl focus:outline-none"
            placeholder="Search..."
          />
          <button
            type='submit'
            className="border border-l-0 border-primary-400 text-primary-400 p-2 rounded-r-xl hover:bg-primary-50"
          >
            <FaSearch />
          </button>
        </form>

        {/* Select lọc trạng thái */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'happening' | 'ended')}
          className="border border-primary-400 rounded px-2 py-1 ml-4"
          title="Filter Promotions by Status"
        >
          <option value="all">All</option>
          <option value="happening">Happening</option>
          <option value="ended">Ended</option>
        </select>

        <button 
          onClick={()=>router.push("/admin/promotions/addpromotions")}
          className="flex items-center border border-primary space-x-2 px-6 py-2.5 text-primary-400 rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-[1.02]"
        >
            <Plus className="w-5 h-5" />
            <span>Add New Promotion</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48 bg-[--color-card] rounded-lg border border-[--color-border]">
          <Loader2 className="w-6 h-6 animate-spin text-[--color-primary] mr-2" />
          <span className="text-[--color-secondary-600]">Loading promotions...</span>
        </div>
      ) : (
        <AdminTable headers={tableHeaders} data={tableData} />
      )}
    </>
  );
}