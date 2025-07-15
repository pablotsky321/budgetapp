'use client'

import BillList from "@/components/BillList";
import BillTypeList from "@/components/BillTypeList";
import { useAuth } from "../context/AuthContext";
import { BillDTO } from "@/interfaces/BillDTO";
import { BillTypeDTO } from "@/interfaces/BillTypeDTO";

const bills: BillDTO[] = [
    {
        id: 'd4f9a2e1-3b6b-4f28-ae9c-1b2d3c4e5f60',
        billType: {
            id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
            userId: 'user-123',
            bill_type: 'Utilities',
            description: 'Pago mensual de servicios públicos'
        },
        billName: 'Electricidad Marzo 2025',
        billValue: '75.20'
    },
    {
        id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9012',
        billType: {
            id: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
            userId: 'user-123',
            bill_type: 'Utilities',
            description: 'Pago mensual de servicios públicos'
        },
        billName: 'Agua Marzo 2025',
        billValue: '32.50'
    },
    {
        id: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0123',
        billType: {
            id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
            userId: 'user-123',
            bill_type: 'Subscription',
            description: 'Servicios de suscripción y streaming'
        },
        billName: 'Netflix Abril 2025',
        billValue: '12.99'
    },
    {
        id: 'a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1234',
        billType: {
            id: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
            userId: 'user-123',
            bill_type: 'Internet',
            description: 'Servicio de internet residencial'
        },
        billName: 'Internet Abril 2025',
        billValue: '45.00'
    },
    {
        id: 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2345',
        billType: {
            id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
            userId: 'user-123',
            bill_type: 'Phone',
            description: 'Plan de telefonía móvil'
        },
        billName: 'Teléfono Marzo 2025',
        billValue: '28.75'
    }
]

const billTypes: BillTypeDTO[] = [
    {
        id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
        userId: 'user-123',
        bill_type: 'Phone',
        description: 'Plan de telefonía móvil'
    },
    {
        id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        userId: 'user-123',
        bill_type: 'Utilities',
        description: 'Pago mensual de servicios públicos'
    },
    {
        id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
        userId: 'user-123',
        bill_type: 'Subscription',
        description: 'Servicios de suscripción y streaming'
    },
    {
        id: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
        userId: 'user-123',
        bill_type: 'Internet',
        description: 'Servicio de internet residencial'
    }
]

export default function Bills() {
    const {isAuthenticated} = useAuth(); 
    
    if (!isAuthenticated) return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You must log in to access this page</p>
                    <a 
                        href="/auth/login" 
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Bills Management</h1>
                <p className="text-lg text-gray-600">Manage your bills and bill types efficiently</p>
            </div>

            {/* Bill Types Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        Bill Types
                    </h2>
                    <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Add New Type
                    </button>
                </div>
                <BillTypeList data={billTypes} />
            </div>

            {/* Bills Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        Bills
                    </h2>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Add New Bill
                    </button>
                </div>
                <BillList data={bills} />
            </div>
        </div>
    );
}