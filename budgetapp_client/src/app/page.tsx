'use client'

import { useState, useEffect} from "react";
import { useAuth } from "./context/AuthContext";
import { fetchBills, fetchBillTypes } from "@/services/billService";
import { BillTypeDTO } from "@/interfaces/BillTypeDTO";
import { BillDTO } from "@/interfaces/BillDTO";
import { getIATip } from "@/services/iaService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const {isAuthenticated} = useAuth();

  const token = localStorage.getItem("token") as string;
  const userId = localStorage.getItem("userId") as string;
  const [billTypes, setBillTypes] = useState([] as BillTypeDTO[]);
  const [bills, setBills] = useState([] as BillDTO[]);
  const [isLoading, setIsLoading] = useState(true);
  const [showIaTips, setShowIaTips] = useState(false);
  const [iaTips, setIaTips] = useState("");
  const [moneyUnit, setMoneyUnit] = useState("");
  const [earnings, setEarnings] = useState(0);
  const [language, setLanguage] = useState("spanish");
  const [loadingIaTips, setLoadingIaTips] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token && userId) {
      Promise.all([
        fetchBillTypes(userId, token),
        fetchBills(userId, token)
      ])
        .then(([typesResponse, billsResponse]) => {
          setBillTypes(typesResponse);
          setBills(billsResponse);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("There was an unexpected error loading your data");
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, token, userId]);

  const mapBillTypes = ():{billType: string, expense: number}[] => {
    const mappedBillTypes: {billType: string, expense: number}[] = [];
    if (billTypes.length > 0){
      billTypes.forEach((billType) => {
        let sum = 0;
        if (bills.length > 0){
          bills.forEach((bill) => {
            if(bill?.billType){
              if (bill.billType.id === billType.id){
                sum += bill.billValue;
              }
            }
          })
        }
        mappedBillTypes.push({"billType": billType.bill_type, "expense":sum})
      })
    }
    return mappedBillTypes;
  }

  const getTotalExpenses = () => {
    return bills.reduce((sum, bill) => sum + (bill.billValue || 0), 0);
  }

  const getMaxExpense = () => {
    const expenses = mapBillTypes().map(bt => bt.expense);
    return Math.max(...expenses, 0);
  }

  const getColorForIndex = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  }

  const changeMoneyUnit = (e) => {
    const unit = e.target.value as string;
    setMoneyUnit(unit);
  }

  const changeEarnings = (e) => {
    const earningValue = e.target.value as number;
    setEarnings(earningValue);
  }

  const changeLanguage = (e) => {
    const lang = e.target.value as string;
    setLanguage(lang);
  }

  const handleGetIaTips = () => {
    setShowIaTips(true)
    setLoadingIaTips(true)
    getIATip(bills, moneyUnit, earnings, language).then((tip) => {
      setLoadingIaTips(false);
      setIaTips(tip as string);
    }).catch((err) => {
      console.error(err);
      alert("There was an unexpected error getting IA tips");
      setLoadingIaTips(false);
    });
  }

  if (!isAuthenticated) return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Take Control of Your Finances
          </h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-90">
            BudgetApp helps anyone—from students to busy professionals—take control of their personal finances. Log in securely, record your monthly income and expenses, and receive personalized saving tips powered by AI. No jargon, no complexity—just simple, actionable insights.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Authentication</h3>
            </div>
            <p className="text-gray-600">Secure sign-up and login to protect your data.</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Monthly Income</h3>
            </div>
            <p className="text-gray-600">Enter your total earnings and see your budget at a glance.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Expense Management</h3>
            </div>
            <p className="text-gray-600">Define expense categories, log spending, and track where your money goes.</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">AI‑Generated Savings Advice</h3>
            </div>
            <p className="text-gray-600">Get tailored tips and strategies powered by DeepSeek to boost your savings.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Technologies Used
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Backend</h3>
            <p className="text-gray-600">Java with Spring Boot for robust, scalable APIs.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Frontend</h3>
            <p className="text-gray-600">JavaScript with Next.js for a fast, SEO-friendly user interface.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">IDE</h3>
            <p className="text-gray-600">Firebase Studio for streamlined development.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Database</h3>
            <p className="text-gray-600">PostgreSQL for reliable, relational data storage.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Integration</h3>
            <p className="text-gray-600">DeepSeek API for intelligent, real-time saving recommendations.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <p className="text-lg mb-8 opacity-90">
            Sign up for free, connect your accounts, and start budgeting in minutes. BudgetApp intuitive design and AI insights will guide you toward healthier financial habits—no accountant required.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const mappedBillTypes = mapBillTypes();
  const totalExpenses = getTotalExpenses();
  const maxExpense = getMaxExpense();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Financial Dashboard</h1>
        <p className="text-lg text-gray-600">Your expenses overview at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Expenses</h3>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Bill Categories</h3>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-3xl font-bold">{billTypes.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Bills</h3>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold">{bills.length}</p>
        </div>
      </div>

      {/* Expenses by Category Chart */}
      {mappedBillTypes.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Expenses by Category</h2>
            <p className="text-gray-600">Visual breakdown of your spending across different categories</p>
          </div>

          <div className="space-y-6">
            {mappedBillTypes.map((billType, index) => {
              const percentage = maxExpense > 0 ? (billType.expense / maxExpense) * 100 : 0;
              const hasExpense = billType.expense > 0;
              
              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColorForIndex(index)} mr-3`}></div>
                      <h3 className="text-sm font-semibold text-gray-700">{billType.billType}</h3>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ${billType.expense.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getColorForIndex(index)} transition-all duration-1000 ease-out flex items-center justify-end pr-3 ${
                        hasExpense ? 'group-hover:opacity-90' : ''
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 15 && (
                        <span className="text-white text-xs font-semibold">
                          {percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    {percentage <= 15 && percentage > 0 && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs font-semibold">
                        {percentage.toFixed(1)}%
                      </span>
                    )}
                    {percentage === 0 && (
                      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        No expenses
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Bill Types Found</h3>
          <p className="text-gray-600 mb-6">Start by creating bill categories to organize your expenses</p>
          <button 
            onClick={() => window.location.href = '/bills/billtypes/addBillType'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Bill Type
          </button>
        </div>
      )}

      {/* Recent Bills List */}
      {bills.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recent Bills</h2>
              <p className="text-gray-600">Your latest expense entries</p>
            </div>
            <button 
              onClick={() => window.location.href = '/bills'}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {bills.slice(0, 5).map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-sm">
                      {bill.billName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{bill.billName}</h4>
                    {bill.billType && (
                      <span className="text-xs text-gray-500">{bill.billType.bill_type}</span>
                    )}
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">${bill.billValue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Bills Found</h3>
          <p className="text-gray-600 mb-6">Start tracking your expenses by adding your first bill</p>
          <button 
            onClick={() => window.location.href = '/bills/addBill'}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Add First Bill
          </button>
        </div>
      )}

      {/* AI Financial Tips Section */}
      {bills.length > 0 && billTypes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI Financial Tips</h2>
                <p className="text-gray-600">Get personalized savings advice powered by AI</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="earnings" className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Earnings
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg font-semibold">$</span>
                  </div>
                  <input 
                    type="number" 
                    id="earnings" 
                    name="earnings"
                    onInput={changeEarnings}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="money_unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  id="money_unit" 
                  name="money_unit"
                  value={moneyUnit}
                  onInput={changeMoneyUnit}
                  placeholder="e.g., USD, EUR, COP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Response Language
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="language" 
                  name="language"
                  value={language}
                  onChange={changeLanguage}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer appearance-none"
                >
                  <option value="spanish">Spanish</option>
                  <option value="english">English</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="portuguese">Portuguese</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleGetIaTips}
                disabled={!earnings || !moneyUnit || loadingIaTips}
                className={`bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform shadow-lg ${
                  !earnings || !moneyUnit || loadingIaTips
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-xl'
                }`}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {loadingIaTips ? 'Generating Tips...' : 'Get AI Financial Tips'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Tips Display Modal/Section */}
      {showIaTips && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {loadingIaTips ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Your Finances</h3>
                <p className="text-gray-600">Our AI is generating personalized tips for you...</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Your Personalized Financial Tips</h2>
                        <p className="text-sm opacity-90">AI-powered insights based on your spending</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowIaTips(false)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-6" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mb-3 mt-5" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                        li: ({node, ...props}) => <li className="ml-4" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700 my-4" {...props} />,
                      }}
                    >
                      {iaTips}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setShowIaTips(false)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Close Tips
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}