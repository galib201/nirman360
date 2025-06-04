
import { useState } from 'react';
import { Filter, PropertyType } from '@/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Filter as FilterIcon, Search } from 'lucide-react';

interface PropertyFiltersProps {
  onFilterChange: (filters: Filter) => void;
  currentFilters?: Filter;
  category?: 'buy' | 'rent';
}

const PropertyFilters = ({ onFilterChange, currentFilters = {}, category }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<Filter>(currentFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Price range for slider - adjust based on category
  const minPrice = 0;
  const maxPrice = category === 'rent' ? 500000 : 50000000;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFilters(prev => ({ ...prev, [name]: checked }));
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceMin: value[0],
      priceMax: value[1]
    }));
  };
  
  const handleApplyFilters = () => {
    onFilterChange({ ...filters, category });
  };
  
  const handleResetFilters = () => {
    setFilters({});
    onFilterChange({ category });
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              name="location"
              placeholder="Search location, area, or city"
              value={filters.location || ''}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center">
            <h2 className="text-lg font-semibold capitalize text-nirman-navy">
              {category === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
            </h2>
          </div>
        </div>
        
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 border-t pt-6">
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="px-2">
                <Slider
                  defaultValue={[filters.priceMin || minPrice, filters.priceMax || maxPrice]}
                  max={maxPrice}
                  step={category === 'rent' ? 5000 : 100000}
                  onValueChange={handlePriceChange}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.priceMin ? `₹${filters.priceMin.toLocaleString()}` : '₹0'}</span>
                <span>{filters.priceMax ? `₹${filters.priceMax.toLocaleString()}` : `₹${maxPrice.toLocaleString()}`}</span>
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Property Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['apartment', 'house', 'villa', 'commercial'] as PropertyType[]).map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.type === type}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({ ...prev, type }));
                        } else {
                          setFilters(prev => {
                            const { type, ...rest } = prev;
                            return rest;
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`type-${type}`} className="capitalize">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Bedrooms</Label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, '5+'].map((num, index) => (
                  <Button
                    key={`bed-${index}`}
                    variant={filters.bedrooms === (num === '5+' ? 5 : num as number) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (filters.bedrooms === (num === '5+' ? 5 : num as number)) {
                        const { bedrooms, ...rest } = filters;
                        setFilters(rest);
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          bedrooms: num === '5+' ? 5 : num as number 
                        }));
                      }
                    }}
                    className="h-8"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">More Filters</Label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="furnished"
                    checked={filters.furnished}
                    onCheckedChange={(checked) => handleCheckboxChange('furnished', !!checked)}
                  />
                  <Label htmlFor="furnished">Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => handleCheckboxChange('verified', !!checked)}
                  />
                  <Label htmlFor="verified">Verified Only</Label>
                </div>
                {category === 'rent' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bachelors"
                      checked={filters.forBachelors}
                      onCheckedChange={(checked) => handleCheckboxChange('forBachelors', !!checked)}
                    />
                    <Label htmlFor="bachelors">Bachelor Friendly</Label>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm flex items-center gap-1"
          >
            <FilterIcon size={14} />
            {showAdvanced ? 'Hide Filters' : 'More Filters'}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
