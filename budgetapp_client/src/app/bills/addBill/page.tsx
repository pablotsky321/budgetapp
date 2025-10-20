'use client'

import { BillDTO } from "@/interfaces/BillDTO";
import { BillTypeDTO } from "@/interfaces/BillTypeDTO";
import { createBill, fetchBillTypes } from "@/services/billService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function FormBills(){
    const token = localStorage.getItem("token") as string;
    const userId = localStorage.getItem("userId") as string;
    const [billTypes, setBillTypes] = useState([] as BillTypeDTO[]);
    const [billType_id, setBillTypeId] = useState("");
    const [bill, setBill] = useState({} as BillDTO)
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchBillTypes(userId, token)
            .then((response) => {
                setBillTypes(response)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error(err)
                alert("Error loading bill types")
                setIsLoading(false)
            })
    }, [])

    const handlechange = (e) => {
        const {name, value} = e.target
        setBill(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const changeBillType = (e) => {
        const id = e.target.value as string
        setBillTypeId(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSaving(true)
        createBill(token, billType_id, bill)
            .then((response) => {
                alert("Bill created successfully")
                router.push("/bills")
            })
            .catch((err) => {
                alert("Error creating bill")
                setIsSaving(false)
            })
    }

    const isFormValid = bill.billName?.trim() && bill.billValue && billType_id;

    return(
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Bill</h1>
                    <p className="text-gray-600">Track your expenses by adding bill details</p>
                </div>

                {/* Form Card */}
                <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading bill types...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Bill Name Input */}
                            <div>
                                <label 
                                    htmlFor="billName" 
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Bill Name
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
                                        id="billName" 
                                        name="billName"
                                        value={bill.billName || ""}
                                        onChange={handlechange}
                                        required
                                        placeholder="e.g., Netflix, Electric Bill, Gym Membership"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Enter a descriptive name for this bill
                                </p>
                            </div>

                            {/* Bill Value Input */}
                            <div>
                                <label 
                                    htmlFor="billValue" 
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Bill Value
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 text-lg font-semibold">$</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="billValue" 
                                        id="billValue"
                                        value={bill.billValue || ""}
                                        onChange={handlechange}
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Enter the amount for this bill
                                </p>
                            </div>

                            {/* Bill Type Select */}
                            <div>
                                <label 
                                    htmlFor="bill_type_id" 
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Bill Type
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <select 
                                        name="bill_type_id" 
                                        id="bill_type_id" 
                                        onChange={changeBillType}
                                        value={billType_id}
                                        required
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">Select a bill type</option>
                                        {billTypes.map((value) => {
                                            return(
                                                <option key={value.id} value={value.id}>
                                                    {value.bill_type}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Choose the category for this bill
                                </p>
                            </div>

                            {/* No Bill Types Warning */}
                            {billTypes.length === 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex">
                                        <svg className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-semibold text-yellow-800 mb-1">No Bill Types Found</h4>
                                            <p className="text-xs text-yellow-700 mb-2">
                                                You need to create at least one bill type before adding bills.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => router.push("/bills/billType/new")}
                                                className="text-xs text-yellow-800 font-medium underline hover:text-yellow-900"
                                            >
                                                Create Bill Type
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            {bill.billName && bill.billValue && billType_id && (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Bill Summary
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Name:</span>
                                            <span className="font-medium text-gray-900">{bill.billName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Amount:</span>
                                            <span className="font-semibold text-green-600">${parseFloat(bill.billValue).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-medium text-gray-900">
                                                {billTypes.find(bt => bt.id === billType_id)?.bill_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                                <button 
                                    type="submit"
                                    disabled={isSaving || !isFormValid}
                                    className={`w-full sm:flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform shadow-lg ${
                                        isSaving || !isFormValid
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-xl'
                                    }`}
                                >
                                    {isSaving ? (
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
                                            Add Bill
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}