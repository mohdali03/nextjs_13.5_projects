
import React, {useContext, useState, useEffect, createContext} from "react";

interface ThemeContextype {
    Mode: string,
    setMode: (Mode:string) => void
}
const ThemeContext = createContext<ThemeContextype| undefined>(undefined)

export  function ThemeProvider ({children}: {children:React.ReactNode}){
    const [Mode, setMode] = useState('')
    const HandleThemeChanger =()=>{
        if(Mode === 'dark'){
            setMode('light')
            document.documentElement.classList.add('light');

        }
        else{
            setMode('dark')
            document.documentElement.classList.add('dark')
        }
    
    }
    useEffect(() => {
        HandleThemeChanger()
    }, [Mode])
    
    return (
        <ThemeContext.Provider value={{Mode, setMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(context === undefined){
        throw new Error("useTheme is must use in ThemeProvider")
    }

    return context;

}