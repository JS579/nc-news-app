import Card from 'react-bootstrap/Card';

function ArticleCard({article}) {

    return(
        <>
        <Card className="card" style={{ width: '19rem' }} key={article.article_id}>
        <Card.Img variant="top" className="item-img" src={article.article_img_url} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text><br/>
            <span>Author: {article.author}</span><br /><br />
            <span>Date posted: {(new Date(article.created_at)).toDateString()}</span><br /><br />
            <span>Votes: {article.votes}</span> <br /><br />
            <span>Comments: {article.comment_count}</span> 
          </Card.Text>
        </Card.Body>
      </Card>


      </>
    )
}

export default ArticleCard