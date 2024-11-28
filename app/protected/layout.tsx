export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={"h-screen w-screen py-4 px-8"}>
            {children}
        </div>
    );
}