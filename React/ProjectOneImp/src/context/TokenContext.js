import {useContext, createContext} from 'react'

export const TokenContext = createContext({
    tokens: [
        {
            token: '1',
            refresh: '2'
        }],
    
    addToken:(token)=>{},
})

export const useToken=()=>{
    return useContext(TokenContext)
}

export const TokenProvider= TokenContext.Provider