import { Post } from "../models/blog.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";
import { customAlphabet } from "nanoid";

const getPosts = async (req, res) => {
  const result = await Post.find();
  res.status(200).json(result);
  // maybe add some filters and pagination and return filter
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const result = await Post.find({ postId });

  res.status(200).json(result);
};

const addPost = async (req, res) => {
  const { title, body } = req.body;

  const nanoid = customAlphabet("1234567890abcdef", 15);

  const result = await Post.create({
    postId: nanoid(),
    title,
    body,
    date: new Date(),
  });
  res.status(201).json(result);
  // test controller
};

const editPost = async (req, res) => {
  const { postId, title, body } = req.body;
  const editPost = await Post.findOneAndUpdate(
    { postId },
    {
      title,
      body,
    }
  );
  res.json(editPost);
  // finish controller
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  const result = await Post.findOneAndDelete({ postId });
  res.status(201).json("deleted");
};

export default {
  getPosts: ctrlWrapper(getPosts),
  getPostById: ctrlWrapper(getPostById),
  deletePost: ctrlWrapper(deletePost),
  editPost: ctrlWrapper(editPost),
  addPost: ctrlWrapper(addPost),
};
