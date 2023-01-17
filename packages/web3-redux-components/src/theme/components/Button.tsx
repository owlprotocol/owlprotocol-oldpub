import { THEME_COLORS } from "../../constants/index.js";

const Button = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            h: "50px",
            w: ["100%", "auto"],
            minW: "168px",
            px: 10,
            borderRadius: 12,
            fontWeight: "bold",
            color: theme.color7,
            backgroundColor: "transparent",
            _hover: {
                color: theme.color1,
            },
            _focus: {
                outline: 0,
                boxShadow: 0,
            },
        },
        variants: {
            link: {
                color: theme.color1,
                fontSize: 13,
            },
            form: {
                minW: "168px",
                color: theme.color7,
                backgroundColor: theme.color1,
                _hover: {
                    color: theme.color7,
                    opacity: 0.8,
                },
                _disabled: {
                    backgroundColor: theme.color3,
                },
                _active: {
                    backgroundColor: theme.color2,
                },
                _focus: {
                    backgroundColor: theme.color2,
                    outline: 0,
                    boxShadow: 0,
                },
            },
            hollow: {
                bg: "transparent",
                color: theme.color1,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.color1,
                _hover: {
                    bg: theme.color1,
                    color: theme.color7,
                },
                _disabled: {
                    backgroundColor: theme.color3,
                },
                _active: {
                    backgroundColor: theme.color2,
                },
                _focus: {
                    backgroundColor: theme.color2,
                    outline: 0,
                    boxShadow: 0,
                },
            },
            cancel: {
                bg: theme.color10,
                color: theme.color7,
                _hover: {
                    bg: theme.color10,
                    color: theme.color7,
                    opacity: 0.8,
                },
            },
        },
    };
};

export default Button;
