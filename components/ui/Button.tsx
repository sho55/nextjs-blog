type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
}
export default function Button({
    children,
    onClick,
    variant="primary",
}:ButtonProps){
    const baseClasses = "px-4 py-2 rounded font-medium transitions-colors"
    const variantClasses = variant === "primary"? "bg-blue-600 text-white hover:bg-blue-700": "bg-gray-200 text-gray-800 hover:bg-gray-300"

    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>{children}</button>
    )
}