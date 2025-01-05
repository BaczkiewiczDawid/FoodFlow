import Image from "next/image"
import HeroImage from "@/public/hero-image.svg"
import {Button} from "../components/ui/button";
import Link from "next/link";

export default async function Index() {
    return (
        <>
            <div
                className={"flex flex-col justify-center items-center text-center max-w-[90%] lg:max-w-[60%] xl:max-w-[40%] 2xl:max-w-[45%]"}>
                <h1 className={"text-2xl font-bold"}>Organize your meals and shopping online!</h1>
                <p className={"mt-4"}>Start for free now!</p>
                <Image className={"w-3/4 mt-12"} src={HeroImage} alt={"Hero image"}/>
                <div className={"mt-12 flex justify-center items-center flex-col"}>
                    <Link href={"/sign-up"}>
                        <Button className={"px-8"}>Join now!</Button>
                    </Link>
                    <Button variant={"link"} className={"mt-2"}>Already have an account? Login now</Button>
                </div>
            </div>
        </>
    );
}
