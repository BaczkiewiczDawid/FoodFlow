import {SettingsList} from "@/app/protected/settings/components/settings-list";

export default async function Page() {
    return (
        <div>
            <h1 className={"text-xl font-bold"}>Settings</h1>
            <p className={"text-muted-foreground mt-2 text-sm"}>Customize Your app!</p>
            <SettingsList/>
        </div>
    )
}