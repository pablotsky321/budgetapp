export default function Home() {
  return (
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

      {/* Key Features Section */}
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
            <p className="text-gray-600">Get tailored tips and strategies powered by ChatGPT to boost your savings.</p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
            <p className="text-gray-600">OpenAI's ChatGPT API for intelligent, real-time saving recommendations.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <p className="text-lg mb-8 opacity-90">
            Sign up for free, connect your accounts, and start budgeting in minutes. BudgetBuddy's intuitive design and AI insights will guide you toward healthier financial habits—no accountant required.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}