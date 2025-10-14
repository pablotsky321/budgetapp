'use client'

import { BillTypeDTO } from "@/interfaces/BillTypeDTO";
import { deleteBillType } from "@/services/billService";
import Link from "next/link";

export default function BillTypeList({data}:{data: BillTypeDTO[]}) {

    const token = localStorage.getItem("token");

    return (
        <div className="overflow-hidden">
            {data.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No bill types found</h3>
                    <p className="text-gray-500">Start by adding your first bill type</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((billType, index) => (
                                <tr 
                                    key={billType.id} 
                                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                    }`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <span className="text-white font-semibold text-sm">
                                                    {billType.bill_type.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {billType.bill_type}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600 max-w-xs truncate">
                                            {billType.description || 'No description available'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link 
                                                href={`/bills/billtypes/${billType.id}`}
                                                className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Details
                                            </Link>
                                            <button 
                                                className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors duration-200"
                                                onClick={() => {
                                                    deleteBillType(token as string, billType.id).then((response)=>{
                                                        alert(response)
                                                    }).catch((err)=>{
                                                        console.error(err)
                                                    })
                                                }}
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}