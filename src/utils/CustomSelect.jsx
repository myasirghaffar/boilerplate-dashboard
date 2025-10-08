import React from 'react';
import Select from 'react-select';

export const CustomSelectMultiSelect = ({
  field,
  form,
  options,
  placeholder = "Select...",
  isSearchable = false,
  isMulti = false,
  ...props
}) => {
  const { value, name } = field;

  const selectedOptions = isMulti
    ? Array.isArray(value)
      ? options?.filter(opt => value.includes(opt.value))
      : []
    : options?.find(opt => opt.value === value) || null;

  const handleChange = (selected) => {
    const newValue = isMulti
      ? selected ? selected.map((opt) => opt.value) : []
      : selected?.value || '';
    form.setFieldValue(name, newValue);
  };

  return (
    <div className="w-full">
      <Select
        {...props}
        id={name}
        name={name}
        options={options}
        isMulti={isMulti}
        isSearchable={isSearchable}
        value={selectedOptions}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(name, true)}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="react-select"
        menuPosition="fixed"
        menuPortalTarget={document.body}
        styles={{
          container: (base) => ({ ...base, marginTop: 0, marginBottom: 0 }),
          control: (base, state) => ({
            ...base,
            backgroundColor: '#F9FAFB',
            minHeight: '2.85rem',
            height: 'auto',
            borderColor: state.isFocused ? '#68CFF7' : 'rgba(25, 29, 49, 0.05)',
            borderRadius: '0.5rem',
            boxShadow: 'none',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            whiteSpace: 'nowrap', // Important
            maxWidth: '100%',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#68CFF7',
              borderRadius: '9999px',
            },
            '&:hover': { borderColor: 'rgba(25, 29, 49, 0.1)' },
          }),
          valueContainer: (base) => ({
            ...base,
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'thin',
            paddingRight: '8px',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#68CFF7',
              borderRadius: '9999px',
            },
          }),
          placeholder: (base) => ({ ...base, color: '#A7A8A8', fontSize: '0.83rem' }),
          input: (base) => ({ ...base, border: 'none', fontSize: '0.83rem', minWidth: '60px' }),
          singleValue: (base) => ({ ...base, color: '#191D31', fontSize: '0.83rem' }),
          multiValue: (base) => ({ ...base, backgroundColor: '#e6f7fc' }),
          multiValueLabel: (base) => ({ ...base, color: '#191D31', fontSize: '0.83rem' }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#191D31',
            ':hover': { backgroundColor: '#68CFF7', color: 'white' },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#68CFF7'
              : state.isFocused
                ? '#e6f7fc'
                : 'transparent',
            color: state.isSelected ? 'white' : '#000',
            '&:active': { backgroundColor: '#e6f7fc' },
          }),
          menuPortal: (base) => ({ ...base, zIndex: 99999999 }),
          menu: (base) => ({
            ...base,
            maxHeight: 100,
            overflowY: 'auto',
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 100,
            overflowY: 'auto',
          }),
        }}
      />
    </div>
  );
};
