import Card from 'react-bootstrap/Card';
import {Link} from "react-router"
import blank from "../assets/blank_img.jpg"


function TopicCard({topic}) {

    return(
        <> 
       <Link to={`/articles?topic=${topic.slug}`} ><Card className="topic-card" style={{ width: '19rem' }} key={topic.slug}>
        <Card.Img variant="top" src={topic.img_url ? topic.img_url : blank} />
        <Card.Body className="card-body">
          <Card.Title>{topic.slug}</Card.Title>
          <Card.Text><br/>
            <span>{topic.description}</span><br /><br />
          </Card.Text>
        </Card.Body>
      </Card></Link>


      </>
    )
}

export default TopicCard

                