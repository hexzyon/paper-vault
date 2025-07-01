import Link from "next/link";
import React from "react";

const AccountPage = () => {
    return (
        <div className="w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6">
            <h1 className=" w-full flex items-center gap-x-4">
                <Link href={"../"}>
                    <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
                        &lt;
                    </span>
                </Link>
                <span className="text-3xl font-bold">My Account</span>
            </h1>

            <div className="w-full flex justify-center">
                        <Link
                            href={"/user/logout"}
                            className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                        >
                            Logout
                        </Link>
                    </div>
        </div>
    );
}

export default AccountPage;