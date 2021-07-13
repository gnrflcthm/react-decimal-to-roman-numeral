import React from 'react'
import './Input.css'

const Input = ({value, onChange, isOverflow}) => {
    return (
        <div>
            <input className={`number-input form-control text-center ${isOverflow ? 'is-invalid' : ''}`} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Input
