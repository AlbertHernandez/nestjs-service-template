import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

const REPORTS_PATH = path.resolve(process.cwd(), ".nyc_output");
const COVERAGE_PATH = path.resolve(process.cwd(), "coverage");

fs.emptyDirSync(REPORTS_PATH);
fs.copyFileSync(
  `${COVERAGE_PATH}/unit/coverage-final.json`,
  `${REPORTS_PATH}/unit-coverage.json`,
);
fs.copyFileSync(
  `${COVERAGE_PATH}/e2e/coverage-final.json`,
  `${REPORTS_PATH}/e2e-coverage.json`,
);
execSync(`nyc report --report-dir ${COVERAGE_PATH}/merge`, {
  stdio: "inherit",
});
