export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-indigo-600 p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="h-6 w-48 bg-indigo-400 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-indigo-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse">
                <div className="h-32 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
