/** Author snapshot embedded in every blog document. */
export interface BlogAuthor {
  id: string;
  name: string;
}

/** A blog post as the API returns it. */
export interface Blog {
  _id: string;
  title: string;
  topic: string;
  content: string;
  image: string;
  user: BlogAuthor;
  createdAt: string;
  updatedAt: string;
}

/** Body of `POST /blog/create`. */
export interface CreateBlogPayload {
  title: string;
  topic: string;
  content: string;
  image: string;
}

/** Body of `PUT /blog/editblog/:id`. */
export type UpdateBlogPayload = Partial<CreateBlogPayload>;
