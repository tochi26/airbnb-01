'use client';

import Image from 'next/image'; // Ensure you import the Image component from Next.js

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {
    return (
        <Image 
            className="rounded-full"
            height={30} 
            width={30}  
            alt="Avatar"
            src={src || "/images/placeholder.png"}
        />
    );
}

export default Avatar;
