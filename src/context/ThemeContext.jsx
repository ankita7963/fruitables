import { createContext, useReducer } from "react"
import { themeReducer } from "./reducer/theme.reducer";
import { TOOGLE_THEME } from "./ActionTypes";

const initialState = {
    theme: 'light'
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState)

    const toogleTheme = (val) => {
        dispatch({ type: TOOGLE_THEME, payload: val === 'light' ? 'dark' : 'light' })
    }

    return (
        < ThemeContext.Provider
            value={
                { ...state, toogleTheme }
            }
        >
            {children}
        </ThemeContext.Provider >
    )
}