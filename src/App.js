import "./App.css";
import Input from "./Input";
import { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { toRomanNumeral } from "./converter";

const EMPTY_MESSAGE =
    'The number zero did not originally have its own Roman numeral, but the word nulla (the Latin word meaning "none") was used by medieval scholars to represent 0';

function App() {
    const [value, setValue] = useState(0);
    const [isEmpty, toggleEmptyMessage] = useState(value === 0);
    const [isOverflow, toggleOverflow] = useState(value >= 4000000);

    const handleInputChange = (val) => {
        if (val > 3999999) {
            toggleOverflow(true);
            return;
        } else {
            toggleOverflow(false);
            setValue(val === "" ? 0 : !isNaN(val) ? parseInt(val) : value);
        }
    };

    useEffect(() => {
        toggleEmptyMessage(value === 0);
    }, [value]);

    const props = useSpring({ val: value, from: { val: 0 } });
    const emptyValueProps = useTransition(isEmpty, {
        from: { y: -20, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        leave: { y: 20, opacity: 0, position: "absolute", top: 0 },
    });

    return (
        <div
            className="container d-flex justify-content-start flex-column align-content-center w-100 p-4"
            style={{ height: "100vh" }}
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 title-wrapper mb-3">
                    <h2 className="text-center heading">
                        Roman Numeral Converter
                    </h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 input-wrapper mb-3">
                    <Input
                        value={value}
                        onChange={handleInputChange}
                        isOverflow={isOverflow}
                    />
                    {isOverflow && (
                        <small className="text-danger d-block position-absolute text-center">
                            Can only parse numbers between 0 and 4,000,000.
                        </small>
                    )}
                </div>
            </div>
            <div className="output-wrapper row d-flex justify-content-center flex-grow-1">
                {!isEmpty && (
                    <div className="d-flex justify-content-center text-wrap">
                        <p className="text-center align-self-center formatted-output">
                            <animated.span
                                style={props}
                                className="space-top bar"
                            >
                                {props.val.to((x) => {
                                    let temp = toRomanNumeral(
                                        Math.floor(x)
                                    ).split("`");
                                    return temp
                                        .splice(0, temp.length - 1)
                                        .join("");
                                })}
                            </animated.span>
                            <animated.span style={props} className="space-top">
                                {props.val.to((x) => {
                                    let temp = toRomanNumeral(
                                        Math.floor(x)
                                    ).split("`");
                                    return temp[temp.length - 1];
                                })}
                            </animated.span>
                        </p>
                    </div>
                )}
                {emptyValueProps((style, item) => {
                    return (
                        item && (
                            <animated.div
                                style={style}
                                className="col-12 cold-md-4 text-secondary"
                            >
                                <>
                                    <h5 className="text-center">
                                        <b>Did You Know:</b>
                                    </h5>
                                    <h5 className="text-center">
                                        {EMPTY_MESSAGE}.
                                        <a
                                            href="https://en.wikipedia.org/wiki/Roman_numerals#Zero"
                                            style={{
                                                fontSize: "0.5rem",
                                                textDecoration: "none",
                                            }}
                                            className="text-primary"
                                        >
                                            <small>ref</small>
                                        </a>
                                    </h5>
                                </>
                            </animated.div>
                        )
                    );
                })}
            </div>
        </div>
    );
}

export default App;
