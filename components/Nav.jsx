"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
function Nav() {
    const [toggle , settoggle] = useState(false);
    const isUserLoggedIn = true;
    const [providers, setproviders] = useState(null);
    useEffect(() => {
        const setproviders = async () => {
            const response = await getProviders();
            setproviders(response);
        };
        setproviders();
    }, []);
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="images/logo.svg"
                    width={30}
                    height={30}
                    alt="promptopia Logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/*Desktop navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-promot" className="black_btn">
                            Create post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out{" "}
                        </button>
                        <Link href="/profile">
                            <Image
                                src="images/logo.svg"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/*mobile navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">        
                     <Image
                        src="images/logo.svg"
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        onClick={()=>settoggle((prev) => !prev)} 
                    /> 
                  
                    {toggle && (
                        <div className="dropdown">
                            <Link href="/profile" className="deopdown_link " onClick={() => settoggle(false)} >My profile</Link>
                            <Link href="/create-prompt" className="deopdown_link" onClick={() => settoggle(false)} >Create Prompt</Link>
                            <button type="button" className="mt-5 w-full black_btn" onClick={() => {settoggle(false);
                            signOut();}} >Sign Out</button>
                        </div>
                    ) }
                    </div>
                ): (
                    <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        ))}
                </>  
                )}
            </div>
        </nav>
    );
}

export default Nav;
