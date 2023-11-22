'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();
    const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        await fetch('/api/auth/sign-up', {
            method: 'POST',
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        }).then(v => {
            router.push('/api/auth/signin');
            router.refresh();
        });
    }
    return (
        <form
            className="flex flex-col gap-2 mt-10 max-w-md mx-auto"
            onSubmit={onSubmit}
        >
            <input type="email" name="email" id="email" className=" border-black border" />
            <input type="password" name="password" id="password" className=" border-black border" />
            <button type="submit" className="border  border-black">Sign Up</button>
        </form>
    )
}