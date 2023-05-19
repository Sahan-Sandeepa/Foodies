import { useState, useEffect } from 'react';
import { List, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const CommentBox = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [hoveredCommentId, setHoveredCommentId] = useState(null);
    const defaultCommentedBy = 'YourUsername';
    const defaultCommentedAt = new Date().toISOString().split('T')[0];

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8095/comment');
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleEnterPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (comment.trim() === '') {
                message.error('Please enter a comment.');
                return;
            }

            if (editingComment) {
                // Editing existing comment
                try {
                    const updatedComment = {
                        comment,
                        commentedBy: defaultCommentedBy,
                        commentedAt: defaultCommentedAt,
                    };
                    await axios.put(`http://localhost:8095/comment/${editingComment._id}`, updatedComment);
                    setComments((prevComments) =>
                        prevComments.map((c) => (c._id === editingComment._id ? { ...c, ...updatedComment } : c))
                    );
                    setComment('');
                    setEditingComment(null);
                    message.success('Comment updated successfully.');
                } catch (error) {
                    console.error('Error updating comment:', error);
                }
            } else {
                // Adding new comment
                try {
                    const newComment = {
                        comment,
                        commentedBy: defaultCommentedBy,
                        commentedAt: defaultCommentedAt,
                    };
                    const response = await axios.post('http://localhost:8095/comment/create', newComment);
                    setComments((prevComments) => [...prevComments, response.data]);
                    setComment('');
                    message.success('Comment added successfully.');
                } catch (error) {
                    console.error('Error creating comment:', error);
                }
            }
        }
    };

    const handleEdit = (comment) => {
        setEditingComment(comment);
        setComment(comment.comment);
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8095/comment/${commentId}`);
            setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
            message.success('Comment deleted successfully.');
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleCommentHover = (commentId) => {
        setHoveredCommentId(commentId);
    };

    const handleCommentLeave = () => {
        setHoveredCommentId(null);
    };

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Input.TextArea
                    value={comment}
                    onChange={handleInputChange}
                    onKeyPress={handleEnterPress}
                    placeholder="Add a comment..."
                    rows={2}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                />
            </div>
            <List
                itemLayout="vertical"
                dataSource={comments}
                renderItem={(comment) => (
                    <List.Item
                        key={comment._id}
                        onMouseEnter={() => handleCommentHover(comment._id)}
                        onMouseLeave={handleCommentLeave}
                        extra={
                            hoveredCommentId === comment._id && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button
                                        type="text"
                                        style={{ padding: 0 }}
                                        onClick={() => handleEdit(comment)}
                                    >
                                        <EditOutlined />
                                    </Button>
                                    <Button
                                        type="text"
                                        style={{ padding: 0 }}
                                        danger
                                        onClick={() => handleDelete(comment._id)}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            )
                        }
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{comment.commentedBy}</span>
                            <span style={{ fontSize: '12px', color: 'gray' }}>{comment.commentedAt}</span>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>{comment.comment}</div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CommentBox;
