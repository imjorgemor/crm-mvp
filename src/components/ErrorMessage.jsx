import React from 'react'

const ErrorMessage = ({children}) => {
    return (
        <div className="text-center my-4 bg-red-300 text-black font-bold p-3 uppercase">
            {children}
        </div>
    )
}

export default ErrorMessage
