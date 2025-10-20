'use client'

import { BillDTO } from "@/interfaces/BillDTO"
import { BillTypeDTO } from "@/interfaces/BillTypeDTO"
import { fetchBillById, fetchBillTypes, updateBill } from "@/services/billService"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BillDetail() {
    const token = localStorage.getItem("token") as string
    const userId = localStorage.getItem("userId") as string
    const { billId } = useParams()

    const [bill, setBill] = useState({} as BillDTO)
    const [billTypes, setBillTypes] = useState([] as BillTypeDTO[])
    const [billTypeId, setBillTypeId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    useEffect(() => {
        Promise.all([
            fetchBillById(token, billId as string),
            fetchBillTypes(userId, token)
        ])
        .then(([billData, typesData]) => {
            setBill(billData)
            setBillTypeId(billData.billType.id)
            setBillTypes(typesData)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
            alert("Error loading bill details")
            setIsLoading(false)
        })
    }, [billId, token, userId])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSaving(true)
        updateBill(token, billId as string, billTypeId, bill)
            .then((response) => {
                alert("Bill updated successfully!")
                router.push("/bills")
            })
            .catch((error) => {
                alert("Error updating bill.")
                console.error("Error updating bill:", error)
                setIsSaving(false)
            })
    }

    const handlechange = (e) => {
        const { name, value } = e.target
        setBill({
            ...bill,
            [name]: value
        })
    }

    const changeBillType = (e) => {
        const bill_type_id = e.target.value
        setBillTypeId(bill_type_id)
    }

    const isFormValid = bill.billName?.trim() && bill.billValue && billTypeId
    const originalValue = bill.billValue

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading bill details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Bill</h1>
                    <p className="text-gray-600">Update the details of this bill</p>
                </div>

                {/* Form Card */}
                <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl">
                    {/* Info Banner */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <svg className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-semibold text-purple-800 mb-1">Editing Bill</h4>
                                <p className="text-xs text-purple-700">
                                    Make changes to your bill information below. All changes will be saved to your budget.
                                </p>
                            </div>
                        </div>
                    </div>

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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                                    value={billTypeId}
                                    required
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
                                >
                                    {bill?.billType && (
                                        <option value={bill.billType.id}>
                                            {bill.billType.bill_type} (Current)
                                        </option>
                                    )}
                                    {billTypes.map((value) => {
                                        if(bill?.billType && value.id !== bill.billType.id){
                                            return (
                                                <option key={value.id} value={value.id}>
                                                    {value.bill_type}
                                                </option>
                                            )
                                        }
                                        if(!bill?.billType) {
                                            return (
                                                <option key={value.id} value={value.id}>
                                                    {value.bill_type}
                                                </option>
                                            )
                                        }
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

                        {/* Changes Summary */}
                        {bill.billValue && originalValue && parseFloat(bill.billValue) !== parseFloat(originalValue) && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Value Changed</h4>
                                        <p className="text-xs text-blue-700">
                                            <span className="line-through">${parseFloat(originalValue).toFixed(2)}</span>
                                            {' → '}
                                            <span className="font-semibold">${parseFloat(bill.billValue).toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        {bill.id && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Bill Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2">Bill ID:</span>
                                        <span className="font-mono text-gray-700 bg-white px-2 py-1 rounded">{bill.id}</span>
                                    </div>
                                    {bill.billType && (
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">Category:</span>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {bill.billType.bill_type}
                                            </span>
                                        </div>
                                    )}
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