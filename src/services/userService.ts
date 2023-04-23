import pool from '../database/connection'
import { User } from '../modules/interfaces'

type GetUserByEmail = (email: String) => Promise<User>

interface UserService{
    getUserByEmail: GetUserByEmail;
}

const userService: UserService = {
    getUserByEmail: async (email: String): Promise<User> => {
        console.log('Service: Login');
        const query = `
        SELECT *
        FROM users
        WHERE email = $1;`;
        const values = [email];
        try {
            const data = await pool.query(query, values);
            return data.rows[0] as User;
        } catch (err) {
            throw err;
        }
    },
};

export default userService;