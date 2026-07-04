"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxEmpty,
  ComboboxLabel,
} from "@/registry/default/combobox/combobox";
import { useAsyncCombobox } from "@/registry/default/combobox/hooks/use-async-combobox";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Loading03Icon } from "@hugeicons/core-free-icons";

export default function ComboboxAdornments() {
  const [value, setValue] = React.useState<City | null>(null);

  const { items, comboboxProps, isPending } = useAsyncCombobox({
    searchFn: searchCities,
    value,
    onValueChange: setValue,
  });

  return (
    <Combobox
      items={items}
      value={value}
      onValueChange={setValue}
      itemToStringLabel={(city) => city?.name ?? ""}
      {...comboboxProps}
    >
      <div className="flex w-full max-w-xs flex-col gap-1">
        <ComboboxLabel>Search cities</ComboboxLabel>
        <ComboboxInput
          placeholder="e.g. Tokyo"
          start={<HugeiconsIcon icon={Search01Icon} strokeWidth={2} />}
          end={
            isPending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                className="animate-spin"
                strokeWidth={2}
              />
            ) : null
          }
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          {(city: City) => (
            <ComboboxItem key={city.id} value={city}>
              <span className="font-medium">{city.name}</span>
              <span className="text-muted-foreground ml-1.5 text-xs">
                {city.country}
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

interface City {
  id: string;
  name: string;
  country: string;
}

async function searchCities(
  query: string,
  signal: AbortSignal,
): Promise<City[]> {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, Math.random() * 300 + 250);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  const lowerQuery = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery),
  );
}

const cities: City[] = [
  { id: "tokyo", name: "Tokyo", country: "Japan" },
  { id: "osaka", name: "Osaka", country: "Japan" },
  { id: "seoul", name: "Seoul", country: "South Korea" },
  { id: "taipei", name: "Taipei", country: "Taiwan" },
  { id: "singapore", name: "Singapore", country: "Singapore" },
  { id: "bangkok", name: "Bangkok", country: "Thailand" },
  { id: "mumbai", name: "Mumbai", country: "India" },
  { id: "berlin", name: "Berlin", country: "Germany" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "madrid", name: "Madrid", country: "Spain" },
  { id: "lisbon", name: "Lisbon", country: "Portugal" },
  { id: "london", name: "London", country: "United Kingdom" },
  { id: "toronto", name: "Toronto", country: "Canada" },
  { id: "chicago", name: "Chicago", country: "United States" },
  { id: "austin", name: "Austin", country: "United States" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico" },
  { id: "sao-paulo", name: "São Paulo", country: "Brazil" },
  { id: "sydney", name: "Sydney", country: "Australia" },
  { id: "cairo", name: "Cairo", country: "Egypt" },
  { id: "nairobi", name: "Nairobi", country: "Kenya" },
];
