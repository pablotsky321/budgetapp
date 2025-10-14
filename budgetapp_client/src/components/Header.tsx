'use client'

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function Header() {

    const { isAuthenticated, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <header className="bg-white shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Logo y branding */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <img src='next.svg' alt="next.js logo" className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                                BudgetApp
                            </h1>
                            <p className="text-sm text-gray-600 hidden sm:block">
                                Your easy-to-use budgeting app for everyday people.
                            </p>
                        </div>
                    </div>

                    {/* Navegación */}
                    <nav className="flex items-center space-x-6">
                        <ul className="flex items-center space-x-6">
                            <li className="flex items-center space-x-6">
                                <Link
                                    href='/'
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/bills'
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Bills
                                </Link>

                                {!isAuthenticated
                                    ?
                                    (<>
                                        <Link
                                            href='/auth/login'
                                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href='/auth/register'
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            Register
                                        </Link>
                                    </>
                                    ) :
                                    (
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105" onClick={(e)=>handleLogout(e)}>
                                            Log out
                                        </button>
                                    )
                                }
                            </li>
                        </ul>

                    </nav>
                </div>
            </div>
        </header>
    )
}