import React, { useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import { FILTERS } from '../../constants/filter.constant';

export default function HomeFilter({ onChange }) {
  const [breastSide, setBreastSide] = React.useState<string[]>([]);
  const [breastDensity, setBreastDensity] = React.useState<string[]>([]);

  useEffect(() => {
    const updatedToString = breastSide.join() + breastDensity.join();
    onChange(updatedToString);
  }, [breastSide, breastDensity]);

  return (
    <>
      <Filter
        title={FILTERS.breast_side.title}
        items={FILTERS.breast_side.items}
        value={breastSide}
        onChange={setBreastSide}
      />
      <Filter
        title={FILTERS.breast_density.title}
        items={FILTERS.breast_density.items}
        value={breastDensity}
        onChange={setBreastDensity}
      />
    </>
  );
}
