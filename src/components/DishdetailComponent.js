import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form'
import { Link } from 'react-router-dom';

const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len)
const minLength = (len)=>(val)=>(val)&&(val.length>=len)



class CommentForm extends Component {
    constructor(props)
    {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            isModalOpen:false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
      }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

render() { 
    return ( 
        <React.Fragment>
        <Button outline className="bg-white text-dark" onClick={this.toggleModal}>
            <i className="fa fa-pencil fa-lg"></i>{' '}Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
                Submit Comment
            </ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(value)=>this.handleSubmit(value)}>
                <Row className="form-group">
                            <Label htmlFor="rating" md={4}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control"
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </Col>
                </Row>
                <Row className="form-group">
                            <Label htmlFor="author" md={4}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={4}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    rows="6"
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required:'Comment Required'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                        <Col >
                            <Button type="submit" color="primary" >Submit</Button>
                        </Col>
                        </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
        </React.Fragment>
        );
    }
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card>
        <CardImg top src={dish.image}></CardImg>
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
    </div>
    );
}

function RenderComments({comments,addComment,dishId}){
        if(comments != null)
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment)=>{
                        return(
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                    );
                    })}
                </ul>
                 <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );

    else
        return(
            <div>
            </div>
        );

}

const Dishdetail = (props) => {
        if(props.dish != null)
        return(
            <div className="container">
            <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} 
                        addComment = {props.addComment}
                        dishId = {props.dish.id}/>
                </div>
            </div>
        );

    else
        return(
           <div></div>
        );
    }


export default Dishdetail;