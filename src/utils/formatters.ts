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

export const formatPhoneNumber = (phone: string): string => {
  // Format Bangladesh phone numbers
  if (!phone) return '';
  
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if this is a Bangladesh number
  if (cleaned.length === 11 && cleaned.startsWith('01')) {
    return `+880 ${cleaned.substring(1, 4)}-${cleaned.substring(4, 7)}-${cleaned.substring(7)}`;
  }
  
  // Otherwise return as is with spacing
  return cleaned.replace(/(\d{5})(\d{6})/, '$1 $2');
};

export const formatArea = (area: number): string => {
  // Format area in square feet with appropriate suffix
  return `${area.toLocaleString()} sq.ft`;
};

export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatPropertyType = (type: string): string => {
  return type
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};
