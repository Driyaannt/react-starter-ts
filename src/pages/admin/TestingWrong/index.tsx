import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Testing Wrong Page
 * Auto-generated template - customize as needed
 * Route: /admin/testing-wrong
 */
const TestingWrong: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Testing Wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your testing wrong here
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Wrong Content</CardTitle>
          <CardDescription>
            This is an auto-generated template. Start building your component here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your content goes here. This template includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Pre-configured UI components from shadcn/ui</li>
              <li>Responsive layout structure</li>
              <li>Dark mode support</li>
              <li>TypeScript typing</li>
            </ul>
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                💡 Tip: Remove this template content and add your custom logic
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingWrong;
