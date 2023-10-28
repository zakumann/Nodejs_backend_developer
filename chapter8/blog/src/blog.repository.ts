import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Blog, BlogDocument } from "./blog.schema";
import { Model } from "mongoose";

// 블로그 인터페이스
export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: String): Promise<PostDto>;
  deletePost(id: String);
  updatePost(id: String, postDto: PostDto);
}

// 블로그 인터페이스를 구현하여 파일에 데이터를 저장하는 클래스
@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = "./src/blog.data.json";

  async getAllPost(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, "utf8");
    const posts = JSON.parse(datas);
    return posts;
  }

  async createPost(postDto: PostDto) {
    const posts = await this.getAllPost();
    const id = posts.length + 1;
    const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPost();
    const result = posts.find((post) => post.id === id);
    return result;
  }

  async deletePost(id: string) {
    const posts = await this.getAllPost();
    const filteredPosts = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  }

  async updatePost(id: string, postDto: PostDto) {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    posts[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
}

// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
  //Model<BlogDocument> 타입인 blogModel 주입
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>){}

  // 모든 게시글을 읽어오는 함수
  async getAllPost(): Promise<Blog[]>{
    return await this.blogModel.find().exec();
  }

  //게시글 작성
  async createPost(postDto: PostDto){
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  // 하나의 게시글 읽기
  async getPost(id: string): Promise<PostDto>{
    return await this.blogModel.findById(id);
  }

  // 하나의 게시글 삭제
  async deletePost(id: string){
    await this.blogModel.findByIdAndDelete(id);
  }

  // 게시글 업데이트
  async updatePost(id: string, postDto: PostDto){
    const updatePost = { id, ...postDto, updateDt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}