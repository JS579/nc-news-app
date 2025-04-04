import {Link} from 'react-router'
import { getTopics } from '../API'
import { useState, useEffect } from 'react'


function Topics() {

    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    }

    return (

        <>

            <section>
                <h2 className="welcome-msg">Topics</h2>
            </section ><br />
            <ul
                className="topic-list">
                {topics.map((topic) => {
                    return <li key={topic.slug} className="topic"><Link to={`/articles?topic=${topic.slug}`}>{`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}</ Link></li>
                }
                )}</ul>
        </>
    )

}


export default Topics