/**
 * SettingsPage.jsx
 *
 * PURPOSE:
 * Business info + preferences. Kept as local component state for now
 * (no React Query) because there's no real persistence yet — see TODO.
 *
 * // TODO: Persist settings via Laravel API (PUT /api/settings) instead
 * of local state, and load initial values with a useSettings() React
 * Query hook once that endpoint exists.
 */
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";
import { businessSettings } from "../../data/mockData.js";

export default function SettingsPage() {
  const [form, setForm] = useState({
    businessName: businessSettings.businessName,
    currency: businessSettings.currency,
    country: businessSettings.country,
    defaultProfitMargin: businessSettings.defaultProfitMargin,
    priceIncreaseThreshold: businessSettings.alertPreferences.priceIncreaseThreshold,
    marginDropThreshold: businessSettings.alertPreferences.marginDropThreshold,
  });
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    // TODO: send `form` to Laravel here instead of just flashing a message.
    setSaved(true);
  }

  return (
    <div>
      <PageHeader title="Settings" description="Business details and how the app alerts you." />

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Business Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input label="Business Name" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} />
            <Select
              label="Currency"
              options={["SAR", "AED", "KWD", "QAR", "BHD", "OMR", "USD"]}
              value={form.currency}
              onChange={(e) => update("currency", e.target.value)}
            />
            <Input label="Country" value={form.country} onChange={(e) => update("country", e.target.value)} />
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Preferences</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Default Profit Margin (%)"
              type="number"
              value={form.defaultProfitMargin}
              onChange={(e) => update("defaultProfitMargin", e.target.value)}
            />
            <Input
              label="Alert: Price Increase Threshold (%)"
              type="number"
              value={form.priceIncreaseThreshold}
              onChange={(e) => update("priceIncreaseThreshold", e.target.value)}
            />
            <Input
              label="Alert: Margin Drop Threshold (%)"
              type="number"
              value={form.marginDropThreshold}
              onChange={(e) => update("marginDropThreshold", e.target.value)}
            />
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit">Save Changes</Button>
          {saved && <span className="text-sm text-profit-500">Saved (locally — not yet persisted to a backend).</span>}
        </div>
      </form>
    </div>
  );
}
