// Smoke test: build the site, start it, and assert every sitemap route
// (Website Brief v3, Part 0.1) returns HTTP 200. No test framework needed —
// this app has no other tests yet, so a small standalone script is enough.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.SMOKE_PORT ?? 3200);
const ROUTES = [
  "/",
  "/about",
  "/how-we-work/plan",
  "/how-we-work/build",
  "/how-we-work/run",
  "/how-we-work/grow",
  "/solutions/consulting",
  "/solutions/real-estate",
  "/solutions/it-security",
  "/solutions/talent",
  "/solutions/hr-payroll",
  "/solutions/tax-legal-compliance",
  "/solutions/finance-accounting",
  "/models",
  "/gift-city",
  "/location",
  "/calculator",
  "/insights",
  "/insights/what-it-costs-to-run-a-capability-centre-in-ahmedabad",
  "/insights/gift-city-for-capability-centres-what-the-2025-gic-regulations-change",
  "/insights/build-operate-transfer-plan-the-handover-on-day-one",
  "/news",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status) return;
    } catch {
      // not up yet
    }
    await sleep(500);
  }
  throw new Error(`Server at ${url} did not become ready in time`);
}

async function main() {
  console.log("Building...");
  await run("pnpm", ["exec", "next", "build"]);

  console.log("Starting server...");
  const server = spawn("pnpm", ["exec", "next", "start", "--port", String(PORT)], {
    stdio: "inherit",
  });

  let failures = [];
  try {
    await waitForServer(`http://localhost:${PORT}/`);

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      const res = await fetch(url);
      const status = res.status;
      const ok = status === 200;
      console.log(`${ok ? "PASS" : "FAIL"} ${status} ${route}`);
      if (!ok) failures.push({ route, status });
    }
  } finally {
    server.kill("SIGTERM");
    await sleep(500);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} route(s) failed:`);
    for (const f of failures) console.error(`  ${f.route} -> ${f.status}`);
    process.exit(1);
  }

  console.log(`\nAll ${ROUTES.length} routes returned 200.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
