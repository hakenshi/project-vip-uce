'use client'
import React, {useRef, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

export default function AvatarPreview({initialImage, name}: {initialImage: string | null; name: string | null}) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialImage ?? undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (inputRef.current?.files) {
            const file = inputRef.current.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    }

    return(
        <div className={"relative"}>
            <Avatar onClick={() => inputRef.current?.click()} className={"h-40 w-40 cursor-pointer"}>
                <AvatarImage className={"object-cover"} src={previewImage} alt={"avatar"}/>
                <AvatarFallback className={"bg-zinc-700 text-3xl text-white"}>
                    {name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
                <input name={"image"} onChange={handleInputChange} type="file" accept={".jpg, .png, .jpeg"} hidden ref={inputRef}/>
                <div className={"absolute inset-0 flex items-center justify-center bg-opacity-0 hover:bg-opacity-100 opacity-0 hover:opacity-100 bg-gradient-to-tr from-red-500/50 via-red-600/50 to-red-800/50 transition-opacity duration-300 z-10"}>
                    <FontAwesomeIcon icon={faPencilAlt} className={"text-white text-2xl"}/>
                </div>
            </Avatar>

        </div>
    )
}