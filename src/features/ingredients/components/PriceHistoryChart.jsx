/**
 * PriceHistoryChart.jsx
 * Shown on the Ingredient Details page. A small, focused line chart —
 * separated from the details page itself so that page's JSX stays
 * readable as a sequence of clearly named sections.
 */
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Card from "../../../components/ui/Card.jsx";

export default function PriceHistoryChart({ history }) {
  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900">Price History</h3>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#12161A0F" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#333C44" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#333C44" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => `${value} SAR`} contentStyle={{ borderRadius: 10, fontSize: 13 }} />
            <Line type="monotone" dataKey="price" stroke="#A6790A" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
