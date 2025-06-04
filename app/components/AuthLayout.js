// export default function AuthLayout({ children, title }) {
//     return (
//       <>
//         <div className="auth-container bg-gradient-to-br from-blue-50 to-indigo-100">
//           <div className="auth-card">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 handwriting">PrintHub</h1>
//               <p className="text-gray-600 mt-2">Your Digital Printing Partner</p>
//             </div>
//             {children}
//           </div>
//         </div>
//       </>
//     );
//   }

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5680E9] via-[#84CEEB] to-[#C1C8E4] px-4 py-10">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#5AB9EA] tracking-wide">PrintHub</h1>
          <p className="text-sm text-gray-700 mt-1">Your Digital Printing Partner</p>
          {title && <h2 className="text-xl font-semibold text-gray-800 mt-4">{title}</h2>}
        </div>
        {children}
      </div>
    </div>
  );
}

