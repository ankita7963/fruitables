// ctrl + k + g 

import { createTheme } from "@mui/system"



export const token = (mode) => ({
    ...(mode === 'dark' ? {
        primary: {
            100: "#e6f3ce",
            200: "#cde79c",
            300: "#b3dc6b",
            400: "#9ad039",
            500: "#81c408",
            600: "#679d06",
            700: "#4d7605",
            800: "#344e03",
            900: "#1a2702"
        },
        secondary: {
            100: "#fff0d3",
            200: "#ffe1a7",
            300: "#ffd37c",
            400: "#ffc450",
            500: "#ffb524",
            600: "#cc911d",
            700: "#996d16",
            800: "#66480e",
            900: "#332407"
        }
    } : {
        primary: {
            100: "#1a2702",
            200: "#344e03",
            300: "#4d7605",
            400: "#679d06",
            500: "#81c408",
            600: "#9ad039",
            700: "#b3dc6b",
            800: "#cde79c",
            900: "#e6f3ce"
        },
        secondary: {
            100: "#332407",
            200: "#66480e",
            300: "#996d16",
            400: "#cc911d",
            500: "#ffb524",
            600: "#ffc450",
            700: "#ffd37c",
            800: "#ffe1a7",
            900: "#fff0d3"
        }
    })
})



export const themeSetting = (mode) => {
    const colors = token(mode);
    console.log(colors);

    return ({
        palette: {
            mode: mode,
            DataGrid: {
                bg: mode === 'light' ? '#f8fafc' : '#334155',
                pinnedBg: mode === 'light' ? '#f1f5f9' : '#293548',
                headerBg: mode === 'light' ? '#536b6dff' : '#1e293b',
            },
            // ...(mode === 'dark' ? {ok: 'ok'} : {ok: 'ok'})
            ...(mode === 'dark' ?
                {
                    primary: { main: colors.primary[500] },
                    secondary: { main: colors.secondary[400] }
                }
                :
                {
                    primary: { main: colors.primary[500] },
                    secondary: { main: colors.secondary[400] }
                }
            )
        }
    })
}