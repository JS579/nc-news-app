import {Link} from 'react-router'
import { getTopics } from '../API'
import { useState, useEffect } from 'react'
import TopicCard from './TopicCard'


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
                className="articles-list">
                {topics.map((topic) => {
                    return <TopicCard topic={topic} key={topic.slug}/>}
                )}</ul>
        </>
    )

}


export default Topics