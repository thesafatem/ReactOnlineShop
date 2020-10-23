import React, { useState } from "react";

type Language = "EN" | "RU";
type LanguageContext = { language: Language; toggleLanguage: () => void };

export const LanguageContext = React.createContext<LanguageContext>(
    {} as LanguageContext
);

export const LanguageProvider: React.FC = ({ children }) => {
    const [language, setLanguage] = useState<Language>("EN");
    const toggleLanguage = () => {
        setLanguage(language === "EN" ? "RU" : "EN");
    };

    // const color = language === "EN" ? "EN" : "#FFF";
    // const backgroundColor = language === "light" ? "#FFF" : "#333";
    //
    // document.body.style.color = color;
    // document.body.style.backgroundColor = backgroundColor;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};