
export default function DeliveryPage() {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
        Delivery Section
      </h1>

      <p className="text-lg text-gray-700 mb-2">
        This page is rendered on the server (SSR)
      </p>

      <p className="text-sm text-gray-500">
        Server Time: {currentTime}
      </p>

      <p className="mt-6 text-gray-600">
        From here, delivery users can login or register.
      </p>
    </div>
  );
}
