type Props = {
    name: string,
    amount: number
    type: "grammage" | "piece"
}

export const IngredientsItem = ({name, amount, type}: Props) => {
    const countPieces = (amount: number) => {
        if (amount === 1) {
            return "piece"
        } else {
            return 'pieces'
        }
    }

    return (
        <div>
            {type === "grammage" ? (
                <li>{name} - {amount}g</li>
            ) : (
                <li>{name} - {amount} {countPieces(amount)}</li>
            )
            }
        </div>
    )
}