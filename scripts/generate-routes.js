import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, "../src/pages");
const ROUTES_OUTPUT = path.join(
  __dirname,
  "../src/routes/generated-routes.tsx"
);

// Function to convert folder name to route path
function folderNameToPath(name) {
  // Convert PascalCase or camelCase to kebab-case
  let path = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  // Remove 'Page' suffix if exists
  path = path.replace(/-?page$/, "");

  // Clean up any trailing dashes
  path = path.replace(/-+$/, "");

  return path || name.toLowerCase();
}

// Function to scan pages directory
function scanPagesDirectory(dir, baseDir = "", type = "admin") {
  const routes = [];
  const imports = [];

  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Check if directory contains index.tsx
      const indexPath = path.join(fullPath, "index.tsx");
      if (fs.existsSync(indexPath)) {
        const componentName = item;
        const routePath = folderNameToPath(item);

        // Special handling for Login page (no path prefix in nested route)
        const actualPath = componentName === "Login" ? "login" : routePath;

        // Generate import statement
        const importPath = `@/pages/${type}/${componentName}`;
        imports.push({
          name: componentName,
          path: importPath,
        });

        // Generate route object
        routes.push({
          path: actualPath,
          component: componentName,
          name: componentName,
        });
      }
    }
  });

  return { routes, imports };
}

// Function to generate route file content
function generateRouteFile(adminRoutes, userRoutes) {
  const allImports = [
    ...adminRoutes.imports.map(
      (imp) => `import ${imp.name} from "${imp.path}";`
    ),
    ...userRoutes.imports.map(
      (imp) => `import ${imp.name} from "${imp.path}";`
    ),
  ];

  const adminRouteElements = adminRoutes.routes
    .map(
      (route) => `  { path: "${route.path}", element: <${route.component} /> }`
    )
    .join(",\n");

  const userRouteElements = userRoutes.routes
    .map(
      (route) => `  { path: "${route.path}", element: <${route.component} /> }`
    )
    .join(",\n");

  return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Generated at: ${new Date().toISOString()}
// Run 'npm run generate-routes' to regenerate this file

import React from "react";
${allImports.join("\n")}

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

// Admin routes (to be used inside /admin route)
export const adminRoutes: RouteConfig[] = [
${adminRouteElements}
];

// User routes (top-level routes)
export const userRoutes: RouteConfig[] = [
${userRouteElements}
];

// Export all components for manual use if needed
export const AdminComponents = {
${adminRoutes.routes.map((r) => `  ${r.name}`).join(",\n")}
};

export const UserComponents = {
${userRoutes.routes.map((r) => `  ${r.name}`).join(",\n")}
};
`;
}

// Main function
function generateRoutes() {
  console.log("🔍 Scanning pages directory...");

  const adminDir = path.join(PAGES_DIR, "admin");
  const userDir = path.join(PAGES_DIR, "user");

  let adminRoutes = { routes: [], imports: [] };
  let userRoutes = { routes: [], imports: [] };

  if (fs.existsSync(adminDir)) {
    console.log("📂 Found admin pages directory");
    adminRoutes = scanPagesDirectory(adminDir, "", "admin");
    console.log(`   ✅ Generated ${adminRoutes.routes.length} admin routes`);
  }

  if (fs.existsSync(userDir)) {
    console.log("📂 Found user pages directory");
    userRoutes = scanPagesDirectory(userDir, "", "user");
    console.log(`   ✅ Generated ${userRoutes.routes.length} user routes`);
  }

  console.log("\n📝 Generating route file...");
  const fileContent = generateRouteFile(adminRoutes, userRoutes);

  // Create routes directory if it doesn't exist
  const routesDir = path.dirname(ROUTES_OUTPUT);
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }

  fs.writeFileSync(ROUTES_OUTPUT, fileContent);
  console.log(`✅ Routes generated successfully at: ${ROUTES_OUTPUT}`);

  // Generate summary
  console.log("\n📊 Summary:");
  console.log(`   Admin routes: ${adminRoutes.routes.length}`);
  adminRoutes.routes.forEach((r) => {
    console.log(`      - /${r.path} → ${r.component}`);
  });
  console.log(`   User routes: ${userRoutes.routes.length}`);
  userRoutes.routes.forEach((r) => {
    console.log(`      - /${r.path} → ${r.component}`);
  });

  console.log(
    '\n✨ Done! You can now import routes from "src/routes/generated-routes"'
  );
}

// Run the generator
try {
  generateRoutes();
} catch (error) {
  console.error("❌ Error generating routes:", error);
  process.exit(1);
}
