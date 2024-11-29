import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectProps {
  value: string;
  onChange: (location: string) => void;
}

const LOCATIONS = [
  'Kaduna North',
  'Kaduna South',
  'Chikun',
  'Igabi',
  'Kajuru',
  'Zaria',
  'Sabon Gari',
  'Giwa',
  'Makarfi',
  'Kudan',
  'Ikara',
  'Kubau',
  'Soba',
  'Lere',
  'Kauru',
  'Kachia',
  'Jaba',
  'Jema\'a',
  'Kagarko',
  'Sanga',
  'Birnin Gwari',
  'Kaura',
  'Zangon Kataf',
];

export function LocationSelect({ value, onChange }: LocationSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredLocations = query
    ? LOCATIONS.filter(loc => 
        loc.toLowerCase().includes(query.toLowerCase())
      )
    : LOCATIONS;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        Location
      </label>
      
      <div className="relative mt-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a location..."
          className="w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
        />
        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredLocations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => {
                onChange(location);
                setQuery(location);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                value === location ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}