'use client'

import { BillTypeDTO } from "@/interfaces/BillTypeDTO";
import { createBillType } from "@/services/billService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormBillType(){
    const userId = localStorage.getItem("userId") as string
    const token = localStorage.getItem("token") as string
    const [billTypeDTO, setBillTypeDTO] = useState({bill_type: "", description:"", userId: userId} as BillTypeDTO);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handlechange = (e) => {
        const {name, value} = e.target
        setBillTypeDTO(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        createBillType(token, billTypeDTO)
            .then(() => {
                alert("Bill type added successfully")
                router.push("/bills")
            })
            .catch(() => {
                alert("Error adding bill type. Please try again.")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Bill Type</h2>
                    <p className="text-gray-600">Add a new category for organizing your bills</p>
                </div>

                {/* Form Card */}
                <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Bill Type Input */}
                        <div>
                            <label 
                                htmlFor="bill_type" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Bill Type Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="bill_type" 
                                name="bill_type" 
                                onChange={handlechange} 
                                value={billTypeDTO.bill_type}
                                required
                                placeholder="e.g., Utilities, Rent, Subscriptions"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Enter a descriptive name for this bill category
                            </p>
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Description
                            </label>
                            <textarea 
                                id="description" 
                                name="description"
                                onChange={handlechange}
                                value={billTypeDTO.description}
                                rows={4}
                                placeholder="Provide additional details about this bill type..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Optional: Add any relevant information about this category
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4 pt-4">
                            <button 
                                type="submit"
                                disabled={isLoading || !billTypeDTO.bill_type.trim()}
                                className={`flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform shadow-lg ${
                                    isLoading || !billTypeDTO.bill_type.trim()
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:from-green-600 hover:to-blue-600 hover:scale-105 hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Bill Type
                                    </span>
                                )}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => router.push("/bills")}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </span>
                            </button>
                        </div>

                        {/* Helper Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Tip</h4>
                                    <p className="text-xs text-blue-700">
                                        Create bill types that make sense for your budget. Common categories include: Utilities, Rent/Mortgage, Insurance, Entertainment, and Subscriptions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}