import db from "../db.server";

export default class UserServices {
    constructor(admin) {
        this.admin = admin;
        this.session = admin.session;

    }

    async updateUser() {
        const user = await db.user.findUnique({
            where: {
                sessionId: this.session.id,
            },
        });
        if (user) {
            // Store user in the database
            const insertData = {
                userId: user.id,
                email: user.email || this.session.email,
            };
        } else {
            const insertData = {
                userId: user.id,
                email: user.email || this.session.email,
            };
        }

        await db.User.upsert({
            where: { sessionId: this.session.id },
            update: insertData,
            create: insertData,
        });
    }



}
