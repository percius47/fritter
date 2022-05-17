import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    fullName: "Prashant Singh Chauhan",
    username: "pareshaaaaan",
    password: "prashnought",
    bio: "Hey there, Prashant here",
    website: "https://www.prashantsinghchauhan.netlify.app",
    profileAvatar:
    "https://picsum.photos/id/1012/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe" },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav" },
    ],
    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe" },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav" },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10" },
    ],
  },
  {
    _id: uuid(),
    fullName: "John Doe",
    username: "johndoe",
    password: "123john",
    bio: "Hey there, John here",
    website: "https://www.johndoe.com",
    profileAvatar:
      "https://picsum.photos/id/1009/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan" },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav" },
    ],
    followers: [
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10" },
    ],
  },
  {
    _id: uuid(),
    fullName: "Anshaal Khanna",
    username: "anshaal10",
    password: "anshaal123",
    bio: "Hey there, Anshaal here",
    website: "https://www.nike.com",
    profileAvatar:
      "https://picsum.photos/id/1005/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan" },
      { _id: uuid(), fullName: "John Doe", username: "johndoe" },
    ],
    followers: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan" },
    ],
  },
  {
    _id: uuid(),
    fullName: "Aditya Jadhav",
    username: "aditya_jadhav",
    password: "jadhav123",
    bio: "Hello Fritter, Jadhav here!",
    website: "https://www.wikipedia.com",
    profileAvatar:
      "https://picsum.photos/id/100/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan" },
    ],
    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe" },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10" },
    ],
  },
];
