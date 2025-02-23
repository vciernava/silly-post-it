"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

type User = {
    id: string;
    name: string;
    createdAt: Date; 
    updatedAt: Date;
} | null | undefined;

export function User() {
    const [user, setUser] = useState<User>();
    const { mutateAsync: createUser } = api.user.create.useMutation();
    const { mutateAsync: getUser } = api.user.get.useMutation();

    useEffect(() => {
        const id = localStorage.getItem("userId");

        if(id) {
            void getUser({ id }).then((data) => {
                if(!data) void createUser().then((new_data) => {
                    if(!new_data) return;
                    localStorage.setItem("userId", new_data.id);
                    setUser(new_data);
                });
                setUser(data);
            });
        } else {
            void createUser().then((data) => {
                if(!data) return;
                localStorage.setItem("userId", data.id);
                setUser(data);
            });
        }
    }, []);

    return (
        <div className="pb-8">
            { user ? (
                <p className="text-sm">You are currently known as <span className="underline underline-offset-2">{user.name}</span></p>
            ) : (
                <p>Loading...</p>
            ) }
        </div>
    );
}

export default User;