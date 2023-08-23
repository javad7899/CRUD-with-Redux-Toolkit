import { useState, useEffect } from "react";
import { Button, Card, Input, Space, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/features/postSlice";
import LoadingCard from "../UserPost/LoadingCard";
const Home = () => {
  const [id, setId] = useState();
  const [bodyText, setBodyText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, edit, body } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setBodyText(body);
    }
  }, [body]);

  const fetchUserPost = () => {
    if (!id) {
      window.alert("Please Provide an ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  return (
    <Row justify="center" align="middle">
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", margin: 20 }}>Fetch Posts</h1>
        <Input
          placeholder="Enter User Id"
          type="number"
          onChange={(e) => setId(e.target.value)}
          value={id}
          style={{ width: "100%", height: "48px" }}
        />

        <br />
        <br />
        <Space size="small" style={{ margin: 20 }}>
          <Button type="primary" size="large" onClick={fetchUserPost}>
            Fetch User Post
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => navigate("/create")}
          >
            Create User Post
          </Button>
        </Space>
        <br />
        <br />
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <>
            {post.length > 0 && (
              <div className="site-card-border-less-wrapper">
                <Card type="inner">
                  <h4>{post[0].title}</h4>
                  <p style={{ marginBottom: 16 }}>User ID: {post[0].id}</p>
                  {edit ? (
                    <Space direction="vertical" size="large">
                      <Input.TextArea
                        style={{ width: "400px", height: "200px" }}
                        size="large"
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                      />

                      <Space size="middle">
                        <Button
                          style={{ cursor: "pointer" }}
                          type="default"
                          onClick={() => {
                            dispatch(
                              updatePost({
                                id: post[0].id,
                                title: post[0].title,
                                body: bodyText,
                              })
                            );
                            dispatch(setEdit({ edit: false, body: "" }));
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{ cursor: "pointer" }}
                          type="primary"
                          onClick={() =>
                            dispatch(setEdit({ edit: false, body: "" }))
                          }
                        >
                          Cancel
                        </Button>
                      </Space>
                    </Space>
                  ) : (
                    <span>{post[0].body}</span>
                  )}
                </Card>
                {!edit && (
                  <Space
                    size="middle"
                    style={{ marginTop: 35, marginLeft: 5, float: "right" }}
                  >
                    <Button
                      style={{ cursor: "pointer" }}
                      type="primary"
                      danger
                      onClick={() => dispatch(deletePost({ id: post[0].id }))}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ cursor: "pointer" }}
                      type="primary"
                      onClick={() =>
                        dispatch(setEdit({ edit: true, body: post[0].body }))
                      }
                    >
                      Edit
                    </Button>
                  </Space>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Row>
  );
};

export default Home;
