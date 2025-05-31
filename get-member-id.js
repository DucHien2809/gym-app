const { PrismaClient } = require('./backend/src/generated/prisma');
const prisma = new PrismaClient();

(async () => {
  try {
    const members = await prisma.user.findMany({ 
      where: { 
        role: 'member',
        email: { startsWith: 'member' }
      },
      select: { id: true, name: true, email: true }
    });
    
    if (members.length > 0) {
      console.log('Test members found:');
      members.forEach((member, index) => {
        console.log(`${index + 1}. ID: ${member.id}, Name: ${member.name}, Email: ${member.email}`);
      });
      console.log('\nUsing first member for testing...');
      console.log('MEMBER_ID:', members[0].id);
    } else {
      console.log('No test members found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})(); 