const fs = require('fs');
const {resolve} = require('path');
const bunchee = require('..');

const baseUnitTestDir = resolve(__dirname, 'unit');
const unitTestDirs = fs.readdirSync(baseUnitTestDir);

for (const folderName of unitTestDirs) {
  it (`should compile ${folderName} case correctly`, async () => {
    const dirPath = resolve(baseUnitTestDir, folderName) // `${baseUnitTestDir}/${folderName}`;
    const inputeName = resolve(dirPath, 'input') // `${dirPath}/input`;
    const inputFileName = inputeName + (fs.existsSync(`${inputeName}.ts`) ? '.ts' : '.js')
    const distFile = resolve(dirPath, 'dist/bundle.js') // `${dirPath}/dist/bundle.js`;
    const pkgJson = fs.existsSync(`${dirPath}/package.json`) ? require(`${dirPath}/package.json`) : {}


    await bunchee(inputFileName, {file: distFile, format: pkgJson.main ? 'cjs' : 'esm', cwd: dirPath});

    const bundledAssest = fs.readFileSync(distFile, {encoding: 'utf-8'});
    expect(bundledAssest).toMatchSnapshot();
  })
}