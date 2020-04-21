import React from 'react'

export default function filter({value,handleChange}) {
return(
    <div>
        filter:<input value={value} onChange={handleChange} />
    </div>
)

}