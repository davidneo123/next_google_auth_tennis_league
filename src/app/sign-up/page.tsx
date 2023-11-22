import Form from './form';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
    const session = await getServerSession();
    if (!!session) {
        redirect("/");
        console.log('signup page');

    }
    return <Form />;
}