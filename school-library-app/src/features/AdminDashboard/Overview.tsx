import { LoadingOverlay, useComputedColorScheme } from "@mantine/core";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useReadWeeklyReports from "./hooks/useReadWeeklyReports";

export function Overview() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { data: weeklyData, isLoading } = useReadWeeklyReports();

  console.log(weeklyData);
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={weeklyData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tickFormatter={(value: any) => `${value}`}
          />
          <Bar
            dataKey="total"
            fill={`${
              computedColorScheme === "dark" ? "rgba(255,169,3, .8)" : "#FFA903"
            } `}
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
