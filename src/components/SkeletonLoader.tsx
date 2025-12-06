const SkeletonLoader = () => {
  return (
    <div
      role="status"
      className="w-full animate-pulse flex flex-col md:flex-row gap-10 justify-between items-center"
    >
      <div className="space-y-8 flex-1 w-full">
        <div className="h-9 bg-gray-300 rounded-lg w-full sm:max-w-64" />
        <div className="h-15 bg-gray-300 rounded-xl w-full sm:max-w-32" />
        <div className="h-20 bg-gray-300 rounded-xl w-full" />
      </div>
      <div className="size-48 rounded-full bg-gray-300" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonLoader;
