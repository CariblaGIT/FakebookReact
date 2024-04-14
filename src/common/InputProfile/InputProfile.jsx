import "./InputProfile.css"

export const InputProfile = ({inputName, type, name, value, placeholder, disabled, onChange}) => {
    return (
        <div className="inputProfileDesign">
            <label className="inputProfileDesignLabel">{inputName}</label>
            <input
                className="inputProfileDesignInput" 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    )
}