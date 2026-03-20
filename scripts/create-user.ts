/**
 * scripts/create-user.ts
 *
 * Creates a test Firebase Auth user for UI preview purposes.
 *
 * Usage:
 *   pnpm create:user              (targets stage by default)
 *   pnpm create:user --env dev    (targets dev emulator)
 */

import * as admin from 'firebase-admin'

const args = process.argv.slice(2)
const envFlag = args.indexOf('--env')
const env = envFlag !== -1 ? args[envFlag + 1] ?? 'stage' : 'stage'

const projectIds: Record<string, string> = {
  dev: 'hotel-trends',
  stage: 'hotel-trends-stage',
  prod: 'hotel-trends-prod',
}

const projectId = projectIds[env]
if (!projectId) {
  console.error(`❌ Unknown env "${env}". Use: dev | stage | prod`)
  process.exit(1)
}

if (env === 'prod') {
  console.error('❌ Creating test users in production is blocked.')
  process.exit(1)
}

admin.initializeApp({ projectId })

const EMAIL = 'user.staff@hotel.com'
const PASSWORD = 'password123'
const DISPLAY_NAME = 'Staff User'

async function run() {
  const auth = admin.auth()

  // Delete existing user if present so this script is idempotent
  try {
    const existing = await auth.getUserByEmail(EMAIL)
    await auth.deleteUser(existing.uid)
    console.log(`♻️  Deleted existing user ${EMAIL}`)
  } catch {
    // No existing user — that's fine
  }

  const user = await auth.createUser({
    email: EMAIL,
    password: PASSWORD,
    displayName: DISPLAY_NAME,
    emailVerified: true,
  })

  console.log(`✅ Created user:`)
  console.log(`   UID:      ${user.uid}`)
  console.log(`   Email:    ${user.email}`)
  console.log(`   Name:     ${user.displayName}`)
  console.log(`   Password: ${PASSWORD}`)
}

run().catch(err => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
