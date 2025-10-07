import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert folder name to route path
function folderNameToPath(name) {
  let routePath = name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  
  routePath = routePath.replace(/-?page$/, '');
  routePath = routePath.replace(/-+$/, '');
  
  return routePath || name.toLowerCase();
}

// Function to generate component name from folder name
function generateComponentName(folderName) {
  // Remove 'Page' suffix if exists, keep original case
  return folderName.replace(/Page$/, '');
}

// Function to generate page template
function generatePageTemplate(componentName, pageType = 'admin') {
  const routePath = folderNameToPath(componentName);
  const displayName = componentName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');

  return `import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * ${displayName} Page
 * Auto-generated template - customize as needed
 * Route: /${pageType === 'admin' ? 'admin/' : ''}${routePath}
 */
const ${componentName}: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            ${displayName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your ${displayName.toLowerCase()} here
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
          <CardTitle>${displayName} Content</CardTitle>
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

export default ${componentName};
`;
}

// Function to create page with template
function createPageWithTemplate(folderPath, folderName, pageType = 'admin') {
  const indexPath = path.join(folderPath, 'index.tsx');
  
  // Only create if doesn't exist
  if (!fs.existsSync(indexPath)) {
    const componentName = generateComponentName(folderName);
    const template = generatePageTemplate(componentName, pageType);
    
    fs.writeFileSync(indexPath, template);
    console.log(`   ✨ Created template for: ${folderName}`);
    return true;
  }
  
  return false;
}

// Function to scan pages directory and generate routes
function generateRoutesContent(autoCreateTemplates = false) {
  const pagesDir = path.join(__dirname, '../src/pages');
  const adminDir = path.join(pagesDir, 'admin');
  const userDir = path.join(pagesDir, 'user');
  
  const adminRoutes = [];
  const userRoutes = [];
  const imports = [];
  const adminFolders = [];
  const userFolders = [];
  let templatesCreated = false;
  
  // Scan admin pages
  if (fs.existsSync(adminDir)) {
    const folders = fs.readdirSync(adminDir);
    
    folders.forEach(folder => {
      const folderPath = path.join(adminDir, folder);
      
      try {
        const stat = fs.statSync(folderPath);
        
        if (stat.isDirectory()) {
          // Auto-create template if enabled and folder is empty
          if (autoCreateTemplates) {
            const created = createPageWithTemplate(folderPath, folder, 'admin');
            if (created) templatesCreated = true;
          }
          
          const indexPath = path.join(folderPath, 'index.tsx');
          if (fs.existsSync(indexPath)) {
            const routePath = folderNameToPath(folder);
            imports.push(`import ${folder} from "@/pages/admin/${folder}";`);
            adminRoutes.push(`  { path: "${routePath}", element: <${folder} /> }`);
            adminFolders.push(folder);
          }
        }
      } catch (error) {
        // Skip folders with errors
      }
    });
  }
  
  // Scan user pages
  if (fs.existsSync(userDir)) {
    const folders = fs.readdirSync(userDir);
    
    folders.forEach(folder => {
      const folderPath = path.join(userDir, folder);
      
      try {
        const stat = fs.statSync(folderPath);
        
        if (stat.isDirectory()) {
          // Auto-create template if enabled and folder is empty
          if (autoCreateTemplates) {
            const created = createPageWithTemplate(folderPath, folder, 'user');
            if (created) templatesCreated = true;
          }
          
          const indexPath = path.join(folderPath, 'index.tsx');
          if (fs.existsSync(indexPath)) {
            const routePath = folderNameToPath(folder);
            imports.push(`import ${folder} from "@/pages/user/${folder}";`);
            userRoutes.push(`  { path: "/${routePath}", element: <${folder} /> }`);
            userFolders.push(folder);
          }
        }
      } catch (error) {
        // Skip folders with errors
      }
    });
  }
  
  // Auto-generate index.ts exports for admin pages
  if (adminFolders.length > 0) {
    const adminIndexPath = path.join(adminDir, 'index.ts');
    const adminExports = [
      '// 🤖 AUTO-GENERATED - DO NOT EDIT MANUALLY',
      '// Generated at: ' + new Date().toLocaleString(),
      '',
      '// Admin Pages Exports',
      ...adminFolders.map(folder => `export { default as ${folder} } from "./${folder}";`)
    ].join('\n');
    
    fs.writeFileSync(adminIndexPath, adminExports + '\n');
  }
  
  // Auto-generate index.ts exports for user pages
  if (userFolders.length > 0) {
    const userIndexPath = path.join(userDir, 'index.ts');
    const userExports = [
      '// 🤖 AUTO-GENERATED - DO NOT EDIT MANUALLY',
      '// Generated at: ' + new Date().toLocaleString(),
      '',
      '// User Pages Exports',
      ...userFolders.map(folder => `export { default as ${folder} } from "./${folder}";`)
    ].join('\n');
    
    fs.writeFileSync(userIndexPath, userExports + '\n');
  }

  // Generate GENERATED_PATHS constants
  const adminPathsConst = adminFolders.map(folder => {
    const routePath = folderNameToPath(folder);
    const constName = folder.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    return `  ${constName}: buildAdminPath("${routePath}")`;
  });

  const userPathsConst = userFolders.map(folder => {
    const routePath = folderNameToPath(folder);
    const constName = folder.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    return `  ${constName}: "/${routePath}"`;
  });
  
  // Generate file content
  const content = `// 🤖 THIS FILE IS AUTO-GENERATED BY VITE PLUGIN
// Do not edit manually - changes will be overwritten
// Generated at: ${new Date().toLocaleString()}

import React from "react";
${imports.join('\n')}

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

// Admin routes (nested under /admin)
export const adminRoutes: RouteConfig[] = [
${adminRoutes.join(',\n')}
];

// User routes (top-level)
export const userRoutes: RouteConfig[] = [
${userRoutes.join(',\n')}
];

// Total routes: ${adminRoutes.length + userRoutes.length}
// Admin: ${adminRoutes.length} | User: ${userRoutes.length}

// Helper function to build full admin route paths
export const buildAdminPath = (path: string) => \`/admin/\${path}\`;

// Export paths as constants for use in other files
export const GENERATED_PATHS = {
  // Admin routes
${adminPathsConst.join(',\n')},
  
  // User routes
${userPathsConst.join(',\n')},
} as const;
`;
  
  return { content, templatesCreated };
}

// Vite plugin
export default function autoRoutesPlugin() {
  const ROUTES_FILE = path.join(__dirname, '../src/routes/generated-routes.tsx');
  const PAGES_DIR = path.join(__dirname, '../src/pages');
  
  let viteServer;
  let regenerateTimeout = null;
  
  // Debounced generate routes - prevents multiple rapid regenerations
  function debouncedGenerateRoutes(reason = 'File change', autoCreateTemplates = false) {
    if (regenerateTimeout) {
      clearTimeout(regenerateTimeout);
    }
    
    regenerateTimeout = setTimeout(() => {
      console.log(`\n🔄 [Auto Routes] ${reason}`);
      generateRoutes(autoCreateTemplates);
    }, 150); // Wait 150ms for multiple file operations to complete
  }
  
  // Generate routes initially
  function generateRoutes(autoCreateTemplates = false) {
    try {
      const result = generateRoutesContent(autoCreateTemplates);
      const content = result.content;
      const templatesCreated = result.templatesCreated;
      const routesDir = path.dirname(ROUTES_FILE);
      
      if (!fs.existsSync(routesDir)) {
        fs.mkdirSync(routesDir, { recursive: true });
      }
      
      fs.writeFileSync(ROUTES_FILE, content);
      
      console.log('✅ [Auto Routes] Routes regenerated successfully!');
      console.log(`   📝 File: ${path.relative(process.cwd(), ROUTES_FILE)}`);
      
      if (templatesCreated) {
        console.log('   ✨ Templates auto-created for new pages!');
      }      
      // Trigger HMR if server is running
      if (viteServer) {
        const module = viteServer.moduleGraph.getModuleById(ROUTES_FILE);
        if (module) {
          viteServer.moduleGraph.invalidateModule(module);
          viteServer.ws.send({
            type: 'full-reload',
            path: '*'
          });
        }
      }
    } catch (error) {
      console.error('❌ [Auto Routes] Error generating routes:', error);
    }
  }
  
  return {
    name: 'vite-plugin-auto-routes',
    
    // Generate routes when plugin is loaded
    configResolved() {
      console.log('\n🚀 [Auto Routes Plugin] Activated');
      // First pass: create templates for empty folders
      console.log('   🔍 Scanning for empty folders...');
      generateRoutes(true);
    },
    
    // Store Vite dev server instance
    configureServer(server) {
      viteServer = server;
      
      // Watch entire pages directory recursively
      const pagesAdminDir = path.join(PAGES_DIR, 'admin');
      const pagesUserDir = path.join(PAGES_DIR, 'user');
      
      // Add watchers for both directories
      if (fs.existsSync(pagesAdminDir)) {
        server.watcher.add(path.join(pagesAdminDir, '**/*'));
      }
      if (fs.existsSync(pagesUserDir)) {
        server.watcher.add(path.join(pagesUserDir, '**/*'));
      }
      
      // Additionally, set up a polling interval as fallback (every 2 seconds)
      let lastRouteState = null;
      
      function checkForChanges() {
        try {
          // Get current folders with index.tsx
          const adminFolders = fs.existsSync(pagesAdminDir) 
            ? fs.readdirSync(pagesAdminDir)
                .filter(f => {
                  const p = path.join(pagesAdminDir, f);
                  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.tsx'));
                })
            : [];
          
          const userFolders = fs.existsSync(pagesUserDir)
            ? fs.readdirSync(pagesUserDir)
                .filter(f => {
                  const p = path.join(pagesUserDir, f);
                  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.tsx'));
                })
            : [];
          
          const currentState = JSON.stringify({ admin: adminFolders.sort(), user: userFolders.sort() });
          
          if (lastRouteState === null) {
            lastRouteState = currentState;
          } else if (lastRouteState !== currentState) {
            console.log('\n🔍 [Auto Routes] Detected changes via polling');
            lastRouteState = currentState;
            debouncedGenerateRoutes('Polling detected changes');
          }
        } catch (error) {
          // Silently ignore errors in polling
        }
      }
      
      // Poll every 2 seconds
      const pollingInterval = setInterval(checkForChanges, 2000);
      
      // Clean up on server close
      server.httpServer?.on('close', () => {
        clearInterval(pollingInterval);
      });
      
      // Watch for new index.tsx files
      server.watcher.on('add', (file) => {
        const normalizedFile = file.replace(/\\/g, '/');
        if ((normalizedFile.includes('/pages/admin/') || normalizedFile.includes('/pages/user/')) 
            && normalizedFile.endsWith('/index.tsx')) {
          const folderName = path.basename(path.dirname(file));
          console.log(`\n📄 [Auto Routes] New page detected: ${folderName}`);
          debouncedGenerateRoutes(`New page: ${folderName}`);
        }
      });
      
      // Watch for deleted index.tsx files
      server.watcher.on('unlink', (file) => {
        const normalizedFile = file.replace(/\\/g, '/');
        if ((normalizedFile.includes('/pages/admin/') || normalizedFile.includes('/pages/user/')) 
            && normalizedFile.endsWith('/index.tsx')) {
          const folderName = path.basename(path.dirname(file));
          console.log(`\n🗑️  [Auto Routes] Page deleted: ${folderName}`);
          debouncedGenerateRoutes(`Deleted page: ${folderName}`);
        }
      });
      
      // Watch for file changes (content updates)
      server.watcher.on('change', (file) => {
        const normalizedFile = file.replace(/\\/g, '/');
        if ((normalizedFile.includes('/pages/admin/') || normalizedFile.includes('/pages/user/')) 
            && normalizedFile.endsWith('/index.tsx')) {
          const folderName = path.basename(path.dirname(file));
          // Regenerate on content change (in case component name changed)
          debouncedGenerateRoutes(`Updated page: ${folderName}`);
        }
      });
      
      // Watch for new directories
      server.watcher.on('addDir', (dir) => {
        const normalizedDir = dir.replace(/\\/g, '/');
        if (normalizedDir.includes('/pages/admin/') || normalizedDir.includes('/pages/user/')) {
          const folderName = path.basename(dir);
          const parentFolder = path.basename(path.dirname(dir));
          
          // Only process if it's directly under admin or user folders
          if (parentFolder === 'admin' || parentFolder === 'user') {
            console.log(`\n📁 [Auto Routes] New folder detected: ${folderName}`);
            
            // Trigger template creation immediately
            setTimeout(() => {
              console.log(`   🎨 [Auto Routes] Creating template for: ${folderName}...`);
              debouncedGenerateRoutes(`New folder with template: ${folderName}`, true);
            }, 300); // Give time for folder creation to complete
          }
        }
      });
      
      // Watch for deleted directories
      server.watcher.on('unlinkDir', (dir) => {
        const normalizedDir = dir.replace(/\\/g, '/');
        if (normalizedDir.includes('/pages/admin/') || normalizedDir.includes('/pages/user/')) {
          const folderName = path.basename(dir);
          console.log(`\n📂 [Auto Routes] Folder deleted: ${folderName}`);
          debouncedGenerateRoutes(`Deleted folder: ${folderName}`);
        }
      });
      
      console.log('👀 [Auto Routes] Watching for changes in pages directory...');
      console.log('   🔍 Watching: src/pages/admin/**');
      console.log('   🔍 Watching: src/pages/user/**');
      console.log('   🔄 Polling: Every 2 seconds (fallback)');
    },
    
    // Regenerate on build
    buildStart() {
      generateRoutes();
    }
  };
}
