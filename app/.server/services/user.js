import db from "../../db.server";

export default class UserServices {
    constructor(admin, session) {
        this.admin = admin;
        this.session = session;
    }

    async updateUser() {
        const sessionId = this.session.id;
        var insertData = {};
        // const email = this.session.email;
        const user = await db.user.findUnique({
            where: {
                sessionId: sessionId,
            },
        });
        if (user) {
            // Store user in the database
            insertData = {
                sessionId: sessionId,
                // email: user.email || this.session.email,
            };
        } else {
            insertData = {
                sessionId: sessionId,
                // email: user.email || this.session.email,
            };
        }

        const updateUser = await db.user.upsert({
            where: { sessionId: sessionId },
            update: insertData,
            create: insertData,
        });

        // console.log('User created \n', updateUser);

        const userId = updateUser.id;
        const updateSession = await db.session.update({
            where: {
                id: sessionId,
            },
            data: {
                userId: userId,
            },
        });
    }



}
