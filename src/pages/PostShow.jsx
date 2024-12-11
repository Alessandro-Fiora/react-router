import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Label from "../components/Label";
const customApiUrl = import.meta.env.VITE_API_URL;

export default function PostShow() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const fetchShowPost = (id) => {
    fetch(customApiUrl + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  };

  useEffect(() => {
    fetchShowPost(id);
  }, []);

  return (
    <div className="container py-5">
      <div className="post">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3">{post.title}</h1>
          <Link to="/posts" type="button" className="btn btn-primary">
            Torna alla lista dei post
          </Link>
        </div>
        <div className="d-flex align-items-center ">
          <div className="img-container me-5">
            <img src={post.img} alt="" />
          </div>
          <div className="post-info">
            <h4 className="h6 fw-normal">
              {post.author ? "Autore: " + post.author : ""}
            </h4>
            <h4 className="h6 fw-light mb-3">
              {post.content ? post.content : ""}
            </h4>

            {post.category && <Label>{post.category}</Label>}

            <h4 className="h6 fw-light mt-2">
              {post.published
                ? "Stato di pubblicazione: Pubblicato"
                : "Stato di pubblicazione: Bozza"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
