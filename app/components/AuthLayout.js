export default function AuthLayout({ children, title }) {
    return (
      <>
        <div className="auth-container bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="auth-card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 handwriting">PrintHub</h1>
              <p className="text-gray-600 mt-2">Your Digital Printing Partner</p>
            </div>
            {children}
          </div>
        </div>
      </>
    );
  }