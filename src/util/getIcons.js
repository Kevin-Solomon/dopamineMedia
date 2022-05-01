import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineHome,
  AiFillHome,
  AiOutlineComment,
} from 'react-icons/ai';
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdOutlineExplore,
  MdExplore,
} from 'react-icons/md';
import { BsThreeDots, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
const getIcons = (type, size) => {
  const style = { fontSize: size, cursor: 'pointer' };
  switch (type) {
    case 'LIKE_FILL':
      return (
        <span style={style}>
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

    default:
      console.error('error in getIcons');
      return new Error('nothing was returned');
  }
};

export { getIcons };
