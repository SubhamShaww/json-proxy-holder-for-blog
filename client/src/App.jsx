import React, { useEffect, useState } from 'react'

function App() {
    const [value, setValue] = useState('/posts')
    const [data, setData] = useState([])
    const [eachPostData, setEachPostData] = useState({ title: "", body: "" })
    const [eachPostDataComments, setEachPostDataComments] = useState([])

    function handlePostClick(id) {
        const API_URL = `https://${window.location.hostname}:1338${value}/${id}`
        fetch(API_URL)
            .then((t) => t.json())
            .then((data) => {
                setEachPostData(data)
            })

        fetch(`${API_URL}/comments`)
            .then((t) => t.json())
            .then((data) => {
                setEachPostDataComments(data)
            })

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const API_URL = `https://${window.location.hostname}:1338${value}`
        fetch(API_URL)
            .then((t) => t.status === 200 ? t.json() : t.statusText)
            .then((data) => {
                !Array.isArray(data) && console.log(data)
                setData(Array.isArray(data) ? data : [data])
            })
    }, [value])

    return (
        <div>
        <h1>Blog Post</h1>
            <div>
                {eachPostData.title && <h3>{eachPostData.title}</h3>}
                {eachPostData.body && <p>{eachPostData.body}</p>}
                {eachPostDataComments.length > 0 && <h4>Comments:</h4>}
                {eachPostDataComments.map(each => <p key={each.id}>{each.body} - <span style={{ fontWeight: "bold", color: "blue" }}>by {each.name}</span></p>)}
            </div>

            <input
                type="text"
                placeholder="write the relative URL here to get data"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <h3>Posts List(select one):</h3>
            <div style={{ background: "grey" }}>
                {data.map((each, index) => <p style={{ cursor: "pointer" }} key={each.id || index} onClick={() => { handlePostClick(each.id) }}>{each.title || each}</p>)}
            </div>
        </div>
    )
}

export default App
