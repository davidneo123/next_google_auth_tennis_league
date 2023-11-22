
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function asyncHome() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        {!!session &&
          <><p>Hi {session.user?.name ?? session.user?.email}</p>
            <div className="flex p-24">
              <Link href="/tennis-league" className="bg-teal-400 shadow text-center p-3">GO to Tennis League List</Link>
            </div></>}
      </div>
    </main>
  )
}
