'use client'

const Unauthorized = () => {
  return (
    <main className="ax-flex ax-h-screen ax-items-center ax-justify-center">
      <div className="ax-text-center">
        <h2 className="ax-text-2xl ax-font-bold">
          Access denied
        </h2>

        <p className="ax-text-sm ax-text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    </main>
  );
};

export default Unauthorized;