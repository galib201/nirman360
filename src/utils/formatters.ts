
export const formatPrice = (price: number): string => {
  // Format price in BDT with appropriate scaling and suffix
  if (price >= 10000000) {
    return `৳${(price / 10000000).toFixed(1)}Cr`;
  } else if (price >= 100000) {
    return `৳${(price / 100000).toFixed(1)}L`;
  } else if (price >= 1000) {
    return `৳${(price / 1000).toFixed(1)}K`;
  } else {
    return `৳${price}`;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
