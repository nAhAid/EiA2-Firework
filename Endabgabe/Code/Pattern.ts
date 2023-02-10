namespace CustomFirework {
    export enum Pattern {
        circle = "circle",
        star = "star",
        cross = "cross"
    }

    export let patterns: { [key: string]: Pattern } = {
        "circle": Pattern.circle,
        "star": Pattern.star,
        "cross": Pattern.cross

    };

}