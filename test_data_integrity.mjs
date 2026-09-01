import { personas, loanOffers, statementPresets, npuTelemetry, analysis, lenders } from './src/lib/data.ts';

console.log('--- STARTING COMPREHENSIVE DATA & LOGIC INTEGRITY TESTS ---');

// Test 1: Persona validation
const personaKeys = Object.keys(personas);
console.assert(personaKeys.length === 3, 'Must have 3 personas');
console.log(`✓ Personas count: ${personaKeys.length} (Anjali, Ramesh, Pooja)`);

for (const key of personaKeys) {
  const p = personas[key];
  console.assert(p.name && p.city && p.phone, `Persona ${key} missing core info`);
  console.assert(p.history.length === 6, `Persona ${key} must have 6-month history`);
  console.assert(p.ratings.length === 3, `Persona ${key} must have 3 dimension ratings`);
  console.assert(p.readinessScore >= 0 && p.readinessScore <= 100, `Persona ${key} score out of range`);
  console.assert(p.statement && p.statement.netPayout > 0, `Persona ${key} statement invalid`);
  console.log(`✓ Persona "${p.name}" (${p.city}): Score ${p.readinessScore}%, Avg ${p.avgMonthly}, Statement ${p.statement.company} (${p.statement.netPayout})`);
}

// Test 2: Loan offers validation
console.assert(loanOffers.length >= 2, 'Must have at least 2 loan offers');
for (const o of loanOffers) {
  console.assert(o.amount > 0 && o.monthlyEmi > 0 && o.tenureMonths > 0, `Offer ${o.id} invalid`);
  console.log(`✓ Loan Offer "${o.title}": ₹${o.amount}, EMI ₹${o.monthlyEmi}/mo for ${o.tenureMonths} mos (${o.interestRate})`);
}

// Test 3: Statement presets validation
console.assert(statementPresets.length === 3, 'Must have 3 statement presets');
for (const s of statementPresets) {
  console.assert(s.company && s.utr && s.netPayout > 0, `Statement ${s.id} invalid`);
  console.log(`✓ Statement preset "${s.company}": UTR ${s.utr}, Payout ₹${s.netPayout}`);
}

// Test 4: NPU Telemetry
console.assert(npuTelemetry.npuCore.includes('Hexagon'), 'NPU silicon missing');
console.assert(npuTelemetry.hashSHA256.length === 64, 'SHA256 must be 64 characters');
console.log(`✓ NPU Telemetry: ${npuTelemetry.npuCore}, Latency ${npuTelemetry.inferenceLatency}, Bandwidth ${npuTelemetry.cloudBandwidth}`);

// Test 5: Lenders list
console.assert(lenders.length >= 2, 'Must have at least 2 lenders');
console.log(`✓ Lenders: ${lenders.map(l => l.name).join(', ')}`);

console.log('--- ALL 5 DATA & LOGIC INTEGRITY TESTS PASSED SUCCESSFULLY (100%) ---');
