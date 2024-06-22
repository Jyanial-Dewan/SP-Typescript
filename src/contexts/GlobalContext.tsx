import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type GlobalContextProviderProps = {
    children: ReactNode
}

type departments = {
    dep_id: number
    dep_name: string
}

type GlobalContext = {
    departments: departments[]
}

const GlobalContext = createContext({} as GlobalContext);

export function useGlobalContext () {
    return useContext(GlobalContext)
}

export function GlobalContextProvider ({children}: GlobalContextProviderProps) {
    const [departments, setDepartments] = useState<departments[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/departments');
                const data = await response.json();
                setDepartments(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [departments])


    return (
        <GlobalContext.Provider value={{departments}}>
            {children}
        </GlobalContext.Provider>
    )
}