export function zip<A, B>(left: A[], right: B[]): [A, B][] {
    return left.flatMap((item, index): [A, B][] => {
        const other = right[index]
        return other === undefined ? [] : [[item, other]]
    })
}
