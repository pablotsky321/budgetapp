'use client'

import { BillTypeDTO } from "@/interfaces/BillTypeDTO";
import { fetchBillTypeById, updateBillType } from "@/services/billService";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function BillTypeDetail(){
    const {id} = useParams()
    const token = localStorage.getItem("token") as string
    const [billTypeDTO, setBillTypeDTO] = useState({} as BillTypeDTO);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter()
    
    useEffect(() => {
        fetchBillTypeById(token, id as string)
            .then((response) => {
                setBillTypeDTO(response)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error(err)
                alert("Error loading bill type details")
                setIsLoading(false)
            })
    }, [])

    const handlechange = (e) => {
        const {name, value} = e.target
        setBillTypeDTO(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        updateBillType(token, billTypeDTO, id as string)
            .then(() => {
                alert("Bill type updated successfully")
                router.push("/bills")
            })
            .catch((err) => {
                console.error(err)
                alert("Error updating bill type. Please try again.")
            })
            .finally(() => {
                setIsSaving(false);
            })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading bill type details...</p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Bill Type</h2>
                    <p className="text-gray-600">Update the details of this bill category</p>
                </div>

                {/* Form Card */}
                <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-semibold text-blue-800 mb-1">Editing Bill Type</h4>
                                <p className="text-xs text-blue-700">
                                    Changes will affect all bills associated with this type.
                                </p>
                            </div>
                        </div>
                    </div>

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
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    id="bill_type" 
                                    name="bill_type" 
                                    value={billTypeDTO.bill_type || ""}
                                    onChange={handlechange}
                                    required
                                    placeholder="e.g., Utilities, Rent, Subscriptions"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
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
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    value={billTypeDTO.description || ""}
                                    onChange={handlechange}
                                    rows={4}
                                    placeholder="Provide additional details about this bill type..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Optional: Add any relevant information about this category
                            </p>
                        </div>

                        {/* Metadata */}
                        {billTypeDTO.id && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Bill Type Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2">ID:</span>
                                        <span className="font-mono text-gray-700 bg-white px-2 py-1 rounded">{billTypeDTO.id}</span>
                                    </div>
                                    {billTypeDTO.userId && (
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">User ID:</span>
                                            <span className="font-mono text-gray-700 bg-white px-2 py-1 rounded truncate">{billTypeDTO.userId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button 
                                type="submit"
                                disabled={isSaving || !billTypeDTO.bill_type?.trim()}
                                className={`w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform shadow-lg ${
                                    isSaving || !billTypeDTO.bill_type?.trim()
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                                }`}
                            >
                                {isSaving ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </span>
                                )}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => router.push("/bills")}
                                disabled={isSaving}
                                className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Bills
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}