export type FilterMenu = {
    title: string;
    items: string[];
    value: string[];
    onChange: (value: string[]) => void;
  };
  
  export type FilterMenuProps = {
    filterMenus: FilterMenu[];
  };  