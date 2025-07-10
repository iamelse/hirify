// Gunakan require untuk kompatibilitas universal
// const { PrismaClient } = require('@prisma/client');

const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Insert user (upsert)
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  });

  // Insert multiple jobs
  await prisma.job.createMany({
    data: [
      {
        userId: user.id,
        company: 'Google',
        position: 'Software Engineer',
        location: 'Remote',
        status: 'APPLIED',
        jobSource: 'LinkedIn',
        jobLink: 'https://linkedin.com/jobs/xyz',
        notes: 'Apply via referral from John.',
      },
      {
        userId: user.id,
        company: 'Startup XYZ',
        position: 'Frontend Developer',
        location: 'Jakarta',
        status: 'INTERVIEW',
        jobSource: 'Telegram ReactJS Group',
        jobLink: null, // null is okay if jobLink is optional in schema
        notes: 'HR contacted via WhatsApp, interview next week.',
      },
      {
        userId: user.id,
        company: 'Microsoft',
        position: 'DevOps Engineer',
        location: 'Singapore',
        status: 'REJECTED',
        jobSource: 'Website',
        jobLink: 'https://careers.microsoft.com/abc',
        notes: 'Rejection email received after 2 weeks.',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seed completed.');
  })
  .catch((e) => {
    console.error('❌ Seed failed.', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
