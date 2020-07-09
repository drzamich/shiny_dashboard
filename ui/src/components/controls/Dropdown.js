
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomDropdown({ keyValues, currentKey, onChange }) {
  return (
    <div class="range-select__comtainer">
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
          { keyValues[currentKey] }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.keys(keyValues).map((key) => (
            <Dropdown.Item
              key={key}
              onClick={() => onChange(key)}
            >{keyValues[key]}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
