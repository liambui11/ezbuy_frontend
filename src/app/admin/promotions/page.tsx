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

const formatDiscount = (discount_value: any) => {
  const value = parseFloat(discount_value);

  if (isNaN(value) || value === 0) return "N/A"; // nếu không có giá trị

  if (value <= 1) {
    return `${(value * 100).toFixed(0)}%`; // ví dụ 0.3 -> 30%
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};


const getStatusDisplay = (promo: Promotion) => {
    if (promo.is_active === 0 || (promo.endDate && isPast(promo.endDate))) {
        return { text: 'Disabled', class: 'bg-danger' };
    }
    if (promo.startDate && isFuture(promo.startDate)) {
        return { text: 'Upcoming', class: 'bg-primary-200' }; 
    }
    return { text: 'Active', class: 'bg-success' };
}

export default function PromotionListPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  const handleDelete = (promoId: number, promoCode: string) => {
      if (window.confirm(`Are you sure you want to delete promotion code ${promoCode}?`)) {
          setPromotions(prev => prev.filter(p => p.id !== promoId));
          console.log(`Deleting promotion ID: ${promoId}`);
      }
  };

  useEffect(()=>{
      const loadData = async () =>{
        try{
          const data = await fetchPromotions();
          setPromotions(data);
        }catch(error){
          console.error("Lỗi khi tải khuyến mãi:", error);
        }finally{
          setIsLoading(false)
        }
      };
      loadData();
    },[])

  const tableHeaders = ['Code', 'Description', 'Value', 'Timeframe', 'Status', 'Actions'];

  const tableData = promotions.map(promo => {
    const statusDisplay = getStatusDisplay(promo);
    return [
        // CODE: Màu Primary (Xanh thương hiệu)
        <span className="font-mono text-primary font-extrabold">{promo.code || 'Auto'}</span>,
        
        // DESCRIPTION: Chữ bình thường nhưng hơi đậm
        <span className="text-foreground">{promo.description}</span>,
        
        // VALUE: Màu Success (Xanh lục) và đậm
        <span className="font-bold text-[--color-success]">{formatDiscount(promo.discountValue)}</span>,
        
        // TIMEFRAME
        <div className="flex flex-col text-sm text-[--color-secondary-600] space-y-1">
            <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-[--color-info]" />
                Start: {promo.startDate ? format(promo.startDate, 'MM/dd/yyyy') : 'N/A'}
            </span>
            <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-[--color-danger]" />
                End: {promo.endDate ? format(promo.endDate, 'MM/dd/yyyy') : 'N/A'}
            </span>
        </div>,
        
        // STATUS
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDisplay.class}`}>
            {statusDisplay.text}
        </span>,
        
        // ACTIONS
        <div className="flex space-x-2">
            {/* Edit Button */}
            <Link 
                href={`/admin/promotions/${promo.id}`} 
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
      <div className="flex justify-between items-center mb-6 border-b border-[--color-border] pb-4">
        <h2 className="text-3xl font-extrabold text-[--color-primary]">Promotion Management</h2>
        <button 
          onClick={()=>router.push("/admin/promotions/addpromotions")}
          className="flex items-center space-x-2 px-6 py-2.5 text-[--color-primary-foreground] bg-[--color-accent] rounded-xl font-bold shadow-lg hover:bg-[#6c42d3] transition-all duration-300 transform hover:scale-[1.02]"
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