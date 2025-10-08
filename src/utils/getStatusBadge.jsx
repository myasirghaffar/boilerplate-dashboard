export const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">Active</span>;
    case 'in-active':
      return <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">In-Active</span>;
    case 'pending':
    default:
      return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Pending</span>;
  }
};