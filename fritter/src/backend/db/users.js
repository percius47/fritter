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
    password: "123",
    bio: "Hey there, Prashant here",
    website: "https://www.prashantsinghchauhan.netlify.app",
    profileAvatar:
    "https://picsum.photos/id/1012/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
    
    
    ],
    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav",profileAvatar:
      "https://picsum.photos/id/100/150" },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
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
    createdAt: "2022-05-05",
    updatedAt: formatDate(),
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav",profileAvatar:
      "https://picsum.photos/id/100/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", }
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
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav",profileAvatar:
      "https://picsum.photos/id/100/150" },
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
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
    ],
  },
];
