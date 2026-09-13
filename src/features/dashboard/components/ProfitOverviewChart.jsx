/**
 * ProfitOverviewChart.jsx
 *
 * PURPOSE:
 * Visualizes Revenue vs Food Cost vs Gross Profit over time using
 * Recharts. Gross profit isn't stored anywhere — it's DERIVED at render
 * time from the two numbers we do have, which is a good general rule:
 * store raw facts, compute the rest.
 *
 * WHY ResponsiveContainer:
 * Recharts needs an explicit pixel width/height to draw an SVG chart.
 * ResponsiveContainer measures its parent element and re-renders the
 * chart at the right size — this is what makes the chart resize
 * correctly on mobile vs desktop without us writing any resize logic.
 */
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Card from "../../../components/ui/Card.jsx";

export default function ProfitOverviewChart({ data }) {
  // Gross profit = revenue - food cost, computed here purely for the chart.
  const chartData = data.map((row) => ({
    ...row,
    grossProfit: row.revenue - row.foodCost,
  }));

  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900">Profit Overview</h3>
      <p className="mb-4 text-sm text-ink-700/60">Revenue, food cost, and gross profit by month</p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: -10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#12161A0F" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#333C44" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#333C44" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #12161A14", fontSize: 13 }}
              formatter={(value) => `${value.toLocaleString()} SAR`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#A6790A" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="foodCost" name="Food Cost" stroke="#B23A2F" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="grossProfit" name="Gross Profit" stroke="#3F6C51" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
