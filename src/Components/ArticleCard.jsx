import Card from 'react-bootstrap/Card';
import {Link} from "react-router"

function ArticleCard({article}) {

    return(
        <> 
       <Link to={`/articles/${article.article_id}`}><Card className="article-card" style={{ width: '19rem' }} key={article.article_id}>
        <Card.Img variant="top" src={article.article_img_url} />
        <Card.Body className="card-body">
          <Card.Title>{article.title}</Card.Title>
          <Card.Text><br/>
            <span>Author: {article.author}</span><br /><br />
            <span>Date posted: {(new Date(article.created_at)).toDateString()}</span><br /><br />
            <span>Votes: {article.votes}</span> <br /><br />
            <span>Comments: {article.comment_count}</span> 
          </Card.Text>
        </Card.Body>
      </Card></Link>


      </>
    )
}

export default ArticleCard