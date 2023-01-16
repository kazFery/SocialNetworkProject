import { useState } from "react"

export default function SearhForm({searchText}) {
const [text, setText] = useState(' ')
const handleSubmit = (e) => {
    e.preventDefault()

    searchText(text)
}

    return (
        <div>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="e.g politics" 
                className="form-control me-sm-2"
                onChange={(e => setText(e.target.value))}>
                </input>
                <button className="btn btn-light my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    )
}