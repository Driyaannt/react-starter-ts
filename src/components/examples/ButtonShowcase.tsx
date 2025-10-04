import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import {
  Download,
  Upload,
  Save,
  Trash2,
  Edit,
  Plus,
  AlertTriangle,
  Check,
} from "lucide-react";

const ButtonShowcase: React.FC = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Custom Button Showcase
        </h1>

        {/* Button Variants */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <CustomButton variant="primary" icon={Save}>
              Primary Button
            </CustomButton>
            <CustomButton variant="secondary" icon={Edit}>
              Secondary Button
            </CustomButton>
            <CustomButton variant="outline" icon={Download}>
              Outline Button
            </CustomButton>
            <CustomButton variant="outline-primary" icon={Upload}>
              Outline Primary
            </CustomButton>
            <CustomButton variant="success" icon={Check}>
              Success Button
            </CustomButton>
            <CustomButton variant="danger" icon={Trash2}>
              Danger Button
            </CustomButton>
            <CustomButton variant="warning" icon={AlertTriangle}>
              Warning Button
            </CustomButton>
            <CustomButton variant="ghost" icon={Plus}>
              Ghost Button
            </CustomButton>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Button Sizes
          </h2>
          <div className="flex items-center gap-4">
            <CustomButton variant="primary" size="sm" icon={Save}>
              Small Button
            </CustomButton>
            <CustomButton variant="primary" size="md" icon={Save}>
              Medium Button
            </CustomButton>
            <CustomButton variant="primary" size="lg" icon={Save}>
              Large Button
            </CustomButton>
          </div>
        </section>

        {/* Icon Positions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Icon Positions
          </h2>
          <div className="flex gap-4">
            <CustomButton variant="outline" icon={Download} iconPosition="left">
              Icon Left
            </CustomButton>
            <CustomButton variant="outline" icon={Upload} iconPosition="right">
              Icon Right
            </CustomButton>
          </div>
        </section>

        {/* Button States */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Button States
          </h2>
          <div className="flex gap-4">
            <CustomButton variant="primary">Normal State</CustomButton>
            <CustomButton variant="primary" loading={true}>
              Loading State
            </CustomButton>
            <CustomButton variant="primary" disabled={true}>
              Disabled State
            </CustomButton>
          </div>
        </section>

        {/* Full Width Button */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Full Width Button
          </h2>
          <CustomButton variant="primary" icon={Save} fullWidth>
            Full Width Button
          </CustomButton>
        </section>

        {/* Action Button Groups */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Action Button Groups
          </h2>

          {/* CRUD Actions */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              CRUD Actions
            </h3>
            <div className="flex gap-2">
              <CustomButton variant="primary" size="sm" icon={Plus}>
                Create
              </CustomButton>
              <CustomButton variant="outline-primary" size="sm" icon={Edit}>
                Read
              </CustomButton>
              <CustomButton variant="success" size="sm" icon={Edit}>
                Update
              </CustomButton>
              <CustomButton variant="danger" size="sm" icon={Trash2}>
                Delete
              </CustomButton>
            </div>
          </div>

          {/* File Operations */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              File Operations
            </h3>
            <div className="flex gap-2">
              <CustomButton variant="outline" size="sm" icon={Download}>
                Export
              </CustomButton>
              <CustomButton variant="outline" size="sm" icon={Upload}>
                Import
              </CustomButton>
              <CustomButton variant="primary" size="sm" icon={Save}>
                Save
              </CustomButton>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Usage Examples
          </h2>
          <div className="bg-gray-800 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`// Basic usage
<CustomButton variant="primary" icon={Save}>
  Save Changes
</CustomButton>

// With loading state
<CustomButton variant="primary" loading={isLoading} onClick={handleSave}>
  Save Changes
</CustomButton>

// Different sizes and variants
<CustomButton variant="success" size="sm" icon={Check}>
  Approve
</CustomButton>

// Full width button
<CustomButton variant="primary" fullWidth>
  Submit Form
</CustomButton>

// Icon on the right
<CustomButton variant="outline" icon={Download} iconPosition="right">
  Download Report
</CustomButton>`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonShowcase;
