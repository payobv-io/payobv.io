type EmptyStateProps = {
  message: string;
  icon: React.ElementType;
};

const EmptyState = ({ message, icon: Icon }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="bg-gray-100 rounded-full p-3 mb-4">
      <Icon className="h-6 w-6 text-gray-400" />
    </div>
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
)

export default EmptyState;