
import { useState, useEffect } from 'react';
import { Property, Filter } from '@/models';
import { PropertyService } from '@/services/api';
import { filterProperties } from '@/utils/propertyHelpers';

export const usePropertyData = (category?: 'buy' | 'rent') => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<Filter>({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PropertyService.getProperties();
        setProperties(data);
        
        // Apply initial category filter if provided
        const initialFilters: Filter = category ? { category } : {};
        setCurrentFilters(initialFilters);
        
        const filtered = filterProperties(data, initialFilters);
        setFilteredProperties(filtered);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  const applyFilters = (filters: Filter) => {
    setCurrentFilters(filters);
    const filtered = filterProperties(properties, filters);
    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    const baseFilters: Filter = category ? { category } : {};
    setCurrentFilters(baseFilters);
    const filtered = filterProperties(properties, baseFilters);
    setFilteredProperties(filtered);
  };

  return {
    properties,
    filteredProperties,
    loading,
    error,
    currentFilters,
    applyFilters,
    clearFilters,
    totalCount: filteredProperties.length
  };
};
