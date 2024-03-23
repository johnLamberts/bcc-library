import {
  Popover,
  Button,
  Divider,
  Badge,
  List,
  Checkbox,
  Text,
  ScrollArea,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { MRT_Column, MRT_RowData } from "mantine-react-table";

interface FacetedFilterProps<TData extends MRT_RowData> {
  column?: MRT_Column<TData>;
  title?: string;
  options?: {
    label: string;
    value: string;
  }[];

  height?: string;
}

export function FacetedFilter<TData extends MRT_RowData>({
  column,
  title,
  options,
  height,
}: FacetedFilterProps<TData>) {
  const facets = column?.getFacetedUniqueValues();

  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const filteredData = options?.filter(
    (item) => item.label !== "" || item.value !== ""
  );

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button
          variant="outline"
          size="sm"
          leftSection={<IconCirclePlus size={14} />}
        >
          {title}

          {selectedValues?.size > 0 && (
            <>
              <Divider mx={"sm"} />

              {/* <Box ></Box> */}
              {selectedValues.size > 2 ? (
                <Badge variant="dot">{selectedValues.size} selected</Badge>
              ) : (
                filteredData
                  ?.filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge variant="dot" key={option.value}>
                      {option.label}
                    </Badge>
                  ))
              )}
            </>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <List spacing={"xs"} size="sm">
          <ScrollArea scrollbars="y" h={height || "100%"}>
            {filteredData?.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <List.Item
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    //   className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
                    key={option.value}
                    checked={isSelected}
                    label={option.label}
                    onChange={() => {
                      selectedValues.clear();

                      // Add the new value to the selectedValues set
                      selectedValues.add(option.value);

                      const filterValues = Array.from(selectedValues);
                      console.log(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  />

                  {/* <Text>{option.label}</Text> */}
                  {facets?.get(option.value) && (
                    <Text className="ml-auto font-mono text-xs">
                      {facets.get(option.value)}
                    </Text>
                  )}
                </List.Item>
              );
            })}
          </ScrollArea>
          {selectedValues.size > 0 && (
            <>
              <Divider my={"xs"} />

              <Button
                size="sm"
                variant="outline"
                onClick={() => column?.setFilterValue(undefined)}
              >
                Clear Filter
              </Button>
            </>
          )}
        </List>
      </Popover.Dropdown>
    </Popover>
  );
}
