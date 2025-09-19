import React from 'react';
import Filter from '../filter/Filter';
import { FilterMenuProps } from '../../types/filter';
import { BoxStyled, TitleStyled } from './style';
import { namespace } from 'axios-retry';

export default function FilterMenu(props: FilterMenuProps) {
  const { title, headers, options, values, onChange, names } = props;

  const handleChange = (key, value) => {
    let newValues = { ...values };
    if (!value || value.length === 0) {
      delete newValues[key];
      return onChange(newValues);
    }
    newValues = { ...values, [key]: value };
    onChange(newValues);
  };

  return (
    <BoxStyled id={`${title.toLowerCase()}-filter-menu`}>
      <TitleStyled>{title}</TitleStyled>
      {Object.entries(headers)?.map(([key, value]) => (
        <Filter
          key={key as string}
          title={value as string}
          items={options ? options[key] : []}
          value={(values && values[key]) || []}
          onChange={(value) => handleChange(key, value)}
          valueNames={names ? names[key] : null}
        />
      ))}
    </BoxStyled>
  );
}
