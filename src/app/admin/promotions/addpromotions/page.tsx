'use client'

import React, { useState } from 'react';
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function AddPromotion(){
  const router = useRouter();

  const [promotion, setPromotion] = useState({
    code: "",
    description: "",
    discountValue: "",
    startDate:"",
    endDate:"",
    active: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPromotion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8081/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(promotion),
      });

      if (!res.ok) throw new Error("Failed to create promotion");

      alert("Promotion created successfully!");
      router.push("/admin/promotions");
    } catch (error) {
      console.error(error);
      alert("Error creating promotion");
    }
  };
  
    return(
      <div className=''>
        <div className='flex items-center  mx-10 relative'>
          <div className="text-2xl font-extrabold text-primary-400">Add New Promotion</div>
          <button 
            onClick={()=>router.back()}
            className = "flex items-center absolute right-3 top-1/2 text-2xl font-semibold cursor-pointer">
            <IoMdExit  className='text-danger'/>
          </button>
        </div>
        <div className='flex justify-center items-center pt-10 bg-gray-50'>
          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-200"
          >
            <div className='mb-2'>
              <label className="block font-medium text-gray-700 mb-2">ID Promotion</label>
              <input
                name="code"
                value={promotion.code}
                onChange={handleChange}
                placeholder="Input Code"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className='block font-medium text-gray-700 mb-2'>Description</label>
              <input
                name="description"
                value={promotion.description}
                onChange={handleChange}
                placeholder='Input Description'
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none'
              />
            </div>
            
            <div>
              <label className='block font-medium text-gray-700 mb-2'>Discount</label>
              <input
                name="discountValue"
                value={promotion.discountValue}
                onChange={handleChange}
                placeholder='Input Discount'
                type="number"
                // min="0"
                // max="100"
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none'
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                 <label className="block font-medium text-gray-700 mb-2">
                   Start Date
                 </label>
                  <input
                    type="date"
                    name="startDate"
                    value={promotion.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={promotion.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div className ="flex items-center justify-between mb-6 pt-4">
              <label className='font-medium text-gray-700'>Active</label>
              {/* <div>
                <span></span>
              </div> */}
              <input
                type="checkbox"
                name="active"
                checked={promotion.active}
                onChange={handleChange}
                className="w-5 h-5 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
              />
            </div>
           
            <button
              type="submit"
              className="w-full bg-primary-500 cursor-pointer font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              Save Promotion
            </button>
          </form>
        </div>
      </div>
    );
}
