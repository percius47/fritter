import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione consequatur asperiores optio ipsa magni nam voluptates non ad, et tenetur velit suscipit quasi. Illum, in, dolores vel tempore iste minus nihil placeat velit aliquam totam unde alias aut rem quidem.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "aditya_jadhav",
    createdAt: "2022-05-01",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "anshaal10",
        text: "nice",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "johndoe",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
"    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi dolore incidunt atque earum unde, delectus sit tempora nesciunt nobis placeat fuga molestias possimus veritatis quisquam libero impedit nulla temporibus eum in repudiandae blanditiis ut ipsam dolor? Harum, voluptate vel est veniam modi labore ipsam facere hic nostrum esse, eius fugit!"
      ,
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          fullName: "Prashant Singh Chauhan",
          username: "pareshaaaaan",
          profileAvatar:
          "https://picsum.photos/id/1012/150",
        },
        {
          _id: uuid(),
          fullName: "John Doe",
          username: "johndoe",
          profileAvatar:
          "https://picsum.photos/id/1009/150",
        },
      ],
      dislikedBy: [],
    },
    username: "anshaal10",

    comments: [
      {
        _id: uuid(),
        username: "pareshaaaaan",
        text: "Nice!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "johndoe",
        text: "Fascinating",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-04-20",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione consequatur asperiores optio ipsa magni nam voluptates non ad, et tenetur velit suscipit quasi. Illum, in, dolores vel tempore iste minus nihil placeat velit aliquam totam unde alias aut rem quidem.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "anshaal10",
        text: "nice",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "john_doe",
        text: "Wow!",
        votes: {
          upvotedBy: [

          ],
          downvotedBy: [],
        },
      },
    ],
  },
];
