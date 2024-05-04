export const DashboardContent = ({ viewName, children }) => {
  return (
    <div className="flex flex-col bg-gray-100 h-screen px-12 [&>div]:gap-3">
      <div className="flex items-center justify-center pt-3 max-h-fit">
        <h1 className="font-sans  font-bold text-center">{viewName}</h1>
      </div>
      {children}
    </div>
  );
}
