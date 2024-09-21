import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { FilterMenu } from '../../types/filter';
import { Chip, TextField, Tooltip } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AutocompleteStyled, MenuItemStyled } from './style';

export default function Filter(props: FilterMenu) {
  const { key, title, items, value, onChange } = props;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // const handleChange = (event: SelectChangeEvent<typeof value>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   onChange(value as string[]);
  // };
  const handleChange = (event: React.SyntheticEvent, value, reason, details) => {
    switch (reason) {
      case 'selectOption':
        onChange(value as string[]);
        break;
      case 'removeOption':
        onChange(value as string[]);
        break;
      case 'clear':
        onChange([]);
        break;
      default:
        break;
    }
  };

  const handleDelete = (removedItem: string) => {
    const newValue = value.filter((item) => item !== removedItem);
    onChange(newValue);
  };

  const renderOption = (props, option, { selected }) => {
    return (
      <Tooltip title={option}>
        <MenuItem key={key} value={option} sx={{ fontSize: 4 }}>
          <Checkbox checked={selected} size="small" />
          <ListItemText primary={option} sx={{ fontSize: 4 }} />
        </MenuItem>
      </Tooltip>
    );
  };

  return (
    <AutocompleteStyled
      key={key}
      multiple
      id="checkboxes-tags-demo"
      value={value ? value : []}
      options={items ? items : []}
      onChange={handleChange}
      disableCloseOnSelect
      openOnFocus
      getOptionLabel={(option: string) => option}
      // renderOption={(props, option: string, { selected }) => {
      //   const { key, ...optionProps } = props;
      //   return (
      //     <li key={key} {...optionProps}>
      //       <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
      //       {option}
      //     </li>
      //   );
      // }}
      renderOption={(props, option: string, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <Tooltip title={option}>
            <MenuItemStyled key={key} value={option}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {option}
            </MenuItemStyled>
          </Tooltip>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          variant="outlined"
          label={title}
        />
      )}
      renderTags={(value) =>
        value.map((option: string, index) => (
          <Tooltip title={option} key={index}>
            <Chip label={option} variant="outlined" onDelete={() => handleDelete(option)} />
          </Tooltip>
        ))
      }
    />
  );
}
//     <div key={key}>
//       <RootStyled>
//         <InputLabelStyled shrink id="demo-multiple-checkbox-label" variant="outlined">
//           {title}
//         </InputLabelStyled>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           multiple
//           value={value}
//           onChange={handleChange}
//           input={<OutlinedInput notched label={title} id="outlined-age-native-simple" />}
//           renderValue={(selected) => (selected as string[]).join(', ')}
//           MenuProps={FilterMenuProps}>
//           {items?.map((item) => (
//             <MenuItem key={item} value={item} sx={{ fontSize: 4 }}>
//               <Checkbox checked={value?.indexOf(item) > -1} size="small" />
//               <ListItemText primary={item} sx={{ fontSize: 4 }} />
//             </MenuItem>
//           ))}
//         </Select>
//       </RootStyled>
//     </div>
//   );
// }
