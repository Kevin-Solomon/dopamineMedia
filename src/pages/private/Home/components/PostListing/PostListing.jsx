import React, { useEffect } from 'react';
import { usePost, useAuth } from '../../../../../context';
import { getPost } from './../../../../../service';
function PostListing() {
  const { postState } = usePost();
  console.log(postState);
  const { authState } = useAuth();

  return <div>PostListing</div>;
}

export default PostListing;
