const ROMAN_NUMERALS = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
};

function parseNumeral(num, index) {
    if (ROMAN_NUMERALS[num.toString()] === undefined) {
        if (num < 4 * Math.pow(10, index)) {
            return ROMAN_NUMERALS[Math.pow(10, index).toString()].repeat(
                num / Math.pow(10, index)
            );
        } else if (num > Math.pow(10, index) * 5) {
            return (
                ROMAN_NUMERALS[(Math.pow(10, index) * 5).toString()] +
                ROMAN_NUMERALS[Math.pow(10, index).toString()].repeat(
                    num / Math.pow(10, index) - 5
                )
            );
        }
    } else {
        return ROMAN_NUMERALS[num.toString()];
    }
}

export const toRomanNumeral = (num) => {
    const numString = num.toString().split("").reverse();
    var numeralString = numString.map((num, index) => {
        let temp = parseInt(num * Math.pow(10, index));
        if (temp === 0) {
            return "";
        }
        if (temp < 4000) {
            return parseNumeral(temp, index);
        } else {
            return parseNumeral(temp / 1000, index - 3) + "`";
        }
    });
    return numeralString.reverse().join("");
};
