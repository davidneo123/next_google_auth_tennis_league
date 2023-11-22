"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SessionButtons = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex justify-between gap-4 ml-auto font-bold">
        <p className="text-blue-700">{session.user.name ?? session.user.email}</p>
        <button onClick={() => signOut()} className="text-orange-700">
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-around gap-9 font-bold text-yellow-500 ml-auto container">
      <button onClick={() => signIn()} className="bg-indigo-400 border shadow p-3">
        Log in
      </button>
      {!(session && session.user) && <Link href="/sign-up" className="bg-teal-400 shadow text-center p-3">
        Sign Up
      </Link>}
    </div>
  );
};

export default SessionButtons;
