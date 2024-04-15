import Modal from 'react-bootstrap/Modal';
import { PostCardDetail } from '../PostCardDetail/PostCardDetail';

export const PopUpPost = (props) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onHide={props.onHide}/>
            <Modal.Body>
                <PostCardDetail key={props.item._id} post={props.item}/>
            </Modal.Body>
        </Modal>
    )
}