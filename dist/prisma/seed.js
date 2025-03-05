"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'nguyenvana@prisma.io' },
        update: {},
        create: {
            email: 'nguyenvana@prisma.io',
            name: 'Nguyen Van A',
            address: 'Ha Noi',
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'nguyenvanb@prisma.io' },
        update: {},
        create: {
            email: 'nguyenvanb@prisma.io',
            name: 'Nguyen Van B',
            isActive: true,
        },
    });
    console.log({ user1, user2 });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map