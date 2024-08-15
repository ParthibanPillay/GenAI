import Image from "next/image";

const Loader = () => {
    return (
        <div className="h-4 flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image 
                alt="loading"
                width="300"
                height="300"
                src="/logo.png"
                />
            </div>
            <p className="text-sm text-muted-foreground">Your answer is being generated...</p>
        </div>
    );
}

export default Loader;