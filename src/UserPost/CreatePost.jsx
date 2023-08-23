import { useState } from "react";
import { Input, Button, Card, Space, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/postSlice";
import LoadingCard from "./LoadingCard";
const CreatePost = () => {
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const [showPost, setShowPost] = useState(false);
  const { post, loading } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  const navgigate = useNavigate();
  const { title, body } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  const showPostBlog = () => {
    return (
      <>
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <Card type="inner">
            <h4>{post[0].title}</h4>
            <p>User ID: {post[0].id}</p>
            <span>{post[0].body}</span>
          </Card>
        )}
      </>
    );
  };
  return (
    <>
      <Row justify="center" align="middle">
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>CreatePost</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input
              placeholder="Enter Title"
              type="text"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              value={title}
              style={{ width: "400px" }}
            />
            <Input.TextArea
              placeholder="Enter Body"
              type="text"
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              value={body}
              style={{ width: "400px", height: "200px" }}
              size="large"
            />
          </div>
          <Space style={{ margin: "24px 0" }}>
            <Button type="default" onClick={() => navgigate(-1)}>
              Go Back
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </form>
      </Row>
      <Row justify="center" align="middle">
        {showPost && <div>{showPostBlog()}</div>}
      </Row>
    </>
  );
};

export default CreatePost;
