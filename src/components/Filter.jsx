import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function Filter({ onFilterChange }) {
  const [orbitingBody, setOrbitingBody] = useState('Orbiting Body'); 

  // Function to handle filter change
  const handleFilterChange = (newOrbitingBody) => {
    setOrbitingBody(newOrbitingBody);
    onFilterChange({ orbitingBody: newOrbitingBody });
  };

  return (
    <div style={{width:"300px", float:"right",marginTop:"20px"}}>
      
  
        
        <Menu as="div" className="relative inline-block w-full">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {orbitingBody}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>

          <MenuItems
            className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleFilterChange('Earth')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Earth
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleFilterChange('Mars')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Mars
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleFilterChange('Jupiter')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Jupiter
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleFilterChange('Mercury')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Mercury
                  </button>
                )}
              </MenuItem>
              
            </div>
          </MenuItems>
        </Menu>
     
    </div>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
