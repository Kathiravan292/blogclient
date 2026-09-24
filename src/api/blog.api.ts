import { http } from './http';
import type {
  ApiResponse,
  Blog,
  CreateBlogPayload,
  GetAllBlogsResponse,
  GetBlogsByTopicResponse,
  GetSingleBlogResponse,
  UpdateBlogPayload,
  UpdateBlogResponse,
} from '@/types';

export const blogApi = {
  async getAll(): Promise<Blog[]> {
    const { data } = await http.get<GetAllBlogsResponse>('/blog/getallblog');

    return data.blogs;
  },

  async getById(id: string): Promise<Blog> {
    const { data } = await http.get<GetSingleBlogResponse>(`/blog/getsingleblog/${id}`);

    return data.data;
  },

  async getByTopic(topic: string): Promise<Blog[]> {
    const { data } = await http.get<GetBlogsByTopicResponse>(
      `/blog/getblogbytopic/${encodeURIComponent(topic)}`,
    );

    return data.data;
  },

  async create(payload: CreateBlogPayload): Promise<ApiResponse> {
    const { data } = await http.post<ApiResponse>('/blog/create', payload);

    return data;
  },

  async update(id: string, payload: UpdateBlogPayload): Promise<Blog> {
    const { data } = await http.put<UpdateBlogResponse>(`/blog/editblog/${id}`, payload);

    return data.data;
  },

  async remove(id: string): Promise<ApiResponse> {
    const { data } = await http.delete<ApiResponse>(`/blog/deleteblog/${id}`);

    return data;
  },
};
