import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineHome,
  AiFillHome,
  AiOutlineComment,
  AiFillEdit,
  AiFillDelete,
  AiOutlineShareAlt,
  AiOutlineMail,
  AiOutlineTwitter,
} from 'react-icons/ai';
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdOutlineExplore,
  MdExplore,
  MdOutlineCancel,
} from 'react-icons/md';
import { BsThreeDots, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaTelegramPlane,
} from 'react-icons/fa';
const getIcons = (type, size) => {
  const style = { fontSize: size, cursor: 'pointer' };
  switch (type) {
    case 'LIKE_FILL':
      return (
        <span style={{ ...style, color: 'red' }}>
          <AiFillHeart />
        </span>
      );
    case 'OUTLINE_HEART':
      return (
        <span style={style}>
          <AiOutlineHeart />
        </span>
      );
    case 'OUTLINE_HOME':
      return (
        <span style={style}>
          <AiOutlineHome />
        </span>
      );
    case 'HOME_FILL':
      return (
        <span style={style}>
          <AiFillHome />
        </span>
      );
    case 'ADD_FILL':
      return (
        <span style={style}>
          <MdAddCircle />
        </span>
      );
    case 'ADD_OUTLINE':
      return (
        <span style={style}>
          <MdAddCircleOutline />
        </span>
      );
    case 'EXPLORE_OUTLINE':
      return (
        <span style={style}>
          <MdOutlineExplore />
        </span>
      );
    case 'EXPLORE_FILL':
      return (
        <span style={style}>
          <MdExplore />
        </span>
      );
    case 'THREE_DOTS':
      return (
        <span style={style}>
          <BsThreeDots />
        </span>
      );
    case 'COMMENT':
      return (
        <span style={style}>
          <AiOutlineComment />
        </span>
      );
    case 'BOOKMARK':
      return (
        <span style={style}>
          <BsBookmark />
        </span>
      );
    case 'BOOKMARK_FILL':
      return (
        <span style={style}>
          <BsBookmarkFill />
        </span>
      );
    case 'EDIT':
      return (
        <span style={style}>
          <AiFillEdit />
        </span>
      );
    case 'CANCEL':
      return (
        <span style={style}>
          <MdOutlineCancel />
        </span>
      );
    case 'UPVOTE':
      return (
        <span style={style}>
          <FaArrowAltCircleUp />
        </span>
      );
    case 'DOWNVOTE':
      return (
        <span style={style}>
          <FaArrowAltCircleDown />
        </span>
      );
    case 'DELETE_POST':
      return (
        <span style={style}>
          <AiFillDelete />
        </span>
      );
    case 'SHARE':
      return (
        <span style={style}>
          <AiOutlineShareAlt />
        </span>
      );
    case 'EMAIL':
      return (
        <span style={style}>
          <AiOutlineMail />
        </span>
      );
    case 'TWITTER':
      return (
        <span style={style}>
          <AiOutlineTwitter />
        </span>
      );
    case 'TELEGRAM':
      return (
        <span style={style}>
          <FaTelegramPlane />
        </span>
      );

    default:
      console.error('error in getIcons');
      return new Error('nothing was returned');
  }
};

export { getIcons };
