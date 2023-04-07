const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const PROJECT_DIR_PATHS = ['packages', 'templates'];

const SKIP_DIRECTORIES = [
  'lib',
  'build',
  'integration',
  'node_modules',
  'template',
];

const IGNORE_DEPENDENCIES = [
  'path',
  'lodash',
  'child_process',
  'fs',
  'crypto',
  'jsonfile',
  'os',
];

const FORBIDDEN_DEPENDENCIES = [];

function findPackages(dirPath) {
  const result = [];
  fs.readdirSync(dirPath).forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const packageJsonPath = path.join(filePath, 'package.json');
    if (fs.statSync(filePath).isDirectory() && fs.existsSync(packageJsonPath)) {
      result.push(filePath);
    }
  });
  return result;
}

function findFilesWithExt(rootDirPath, ext, ignoreExt, ignoredDirectoryNames) {
  const result = [];
  function iterate(dirPath) {
    fs.readdirSync(dirPath).forEach((fileName) => {
      const filePath = path.join(dirPath, fileName);
      if (
        fs.statSync(filePath).isDirectory() &&
        !ignoredDirectoryNames.includes(fileName)
      ) {
        iterate(filePath);
      } else if (fileName.endsWith(ext) && !fileName.endsWith(ignoreExt)) {
        result.push(filePath);
      }
    });
  }
  iterate(rootDirPath);
  return result;
}

function readTsFilesExternalImports(filePaths) {
  const imports = new Set();
  const program = ts.createProgram(filePaths, {});
  for (const tsFilePath of filePaths) {
    const sourceFile = program.getSourceFile(tsFilePath);
    for (const imp of sourceFile.imports) {
      const importPath = imp.text;
      if (!importPath.startsWith('../') && !importPath.startsWith('./')) {
        imports.add(importPath);
      }
    }
  }
  return [...imports];
}

function readImports(tsFilePaths) {
  return readTsFilesExternalImports(tsFilePaths).map((imp) => {
    const hasSlash = imp.includes('/');
    if (!hasSlash) {
      return imp;
    }
    const nameParts = imp.split('/');
    const isScopePackage = imp.includes('@');

    if (isScopePackage) {
      return `${nameParts[0]}/${nameParts[1]}`;
    }

    return nameParts[0];
  });
}

function findProjectMissingDependencies(projectDirPath) {
  const packageJsonPath = path.join(projectDirPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const isTemplate = projectDirPath.includes('templates');
  if (packageJson.private & !isTemplate) {
    return null;
  }
  const projectDependencies = {
    ...(packageJson?.dependencies || {}),
    ...(packageJson?.devDependencies || {}),
  };
  const dependenciesList = Object.keys(projectDependencies || {});

  const tsFilePaths = findFilesWithExt(
    projectDirPath,
    '.ts',
    '.test.ts',
    SKIP_DIRECTORIES
  );
  const imports = readImports(tsFilePaths);

  const missing = imports.reduce((result, imp) => {
    if (!dependenciesList.includes(imp) && !IGNORE_DEPENDENCIES.includes(imp)) {
      result.push(imp);
    }
    return result;
  }, []);
  const forbidden = FORBIDDEN_DEPENDENCIES.filter((regexp) => {
    return (
      imports.some((imp) => regexp.test(imp)) ||
      dependenciesList.some((dep) => regexp.test(dep))
    );
  });
  return { missing, forbidden, total: imports.length };
}

const repositoryPath = path.resolve(__dirname, '..');
const allProjectPaths = PROJECT_DIR_PATHS.map((p) =>
  path.join(repositoryPath, p)
)
  .map(findPackages)
  .flat();

let exitCode = 0;

for (const projectPath of allProjectPaths) {
  const projectName = projectPath.replace(repositoryPath, '');
  const result = findProjectMissingDependencies(projectPath);
  if (!result) {
    console.log(`⏩ Project ${projectName} is private`);
  } else if (result.missing.length > 0 || result.forbidden.length > 0) {
    const missing = result.missing.map((d) => `* [missing] ${d}`).join('\n');
    const forbidden = result.forbidden
      .map((d) => `* [forbidden] ${d}`)
      .join('\n');
    console.log(
      `❌ Project ${projectName} is invalid:\n${missing}\n${forbidden}`
    );
    exitCode = 1;
  } else {
    console.log(
      `✅ Project ${projectName} is valid (${result.total} dependencies)`
    );
  }
}

process.exit(exitCode);
