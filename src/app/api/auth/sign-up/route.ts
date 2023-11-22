import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

const validateEmail = (inputEmail: string) => inputEmail
    .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const validatePassword = (inputPassword: string) => inputPassword
    .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log(validateEmail(email), validatePassword(password))

        if (!(validateEmail(email) && validatePassword(password)))
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Wrong email or password' }),
                { status: 400, headers: { 'content-type': 'application/json' } });

        console.log({ email, password });
        const hashPswd = await hash(password, 10);
        const response = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashPswd});
        `
    } catch (e) {
        console.error(e)
    }
    return NextResponse.json({ message: 'success' });
}