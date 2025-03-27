import db from "../../db.server";

export default class UserServices {
    constructor(admin, session) {
        this.admin = admin;
        this.session = session;
    }

    async updateUser() {
        const sessionId = this.session.id;
        var insertData = {};
        // const user = await db.user.findUnique({
        //     where: {
        //         sessionId: sessionId,
        //     },
        // });

        insertData = {
            sessionId: sessionId,
            // email: user.email || this.session.email,
        };

        const updateUser = await db.user.upsert({
            where: { sessionId: sessionId },
            update: insertData,
            create: insertData,
        });

        const userId = updateUser.id;
        await db.session.update({
            where: {
                id: sessionId,
            },
            data: {
                userId: userId,
            },
        });
    }
}
