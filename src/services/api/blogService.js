import blogData from '@/services/mockData/blogPosts.json';

class BlogService {
  constructor() {
    this.posts = [...blogData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.posts]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = this.posts.find(p => p.Id === parseInt(id));
        if (post) {
          resolve({ ...post });
        } else {
          reject(new Error('Blog post not found'));
        }
      }, 200);
    });
  }

  async getRecent(limit = 3) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recent = this.posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);
        resolve([...recent]);
      }, 250);
    });
  }

  async create(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          ...post,
          Id: Math.max(...this.posts.map(p => p.Id)) + 1,
          date: new Date().toISOString().split('T')[0],
          author: 'Creative Designer'
        };
        this.posts.push(newPost);
        resolve({ ...newPost });
      }, 400);
    });
  }

  async update(id, postData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.posts.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.posts[index] = { ...this.posts[index], ...postData };
          resolve({ ...this.posts[index] });
        } else {
          reject(new Error('Blog post not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.posts.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.posts.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error('Blog post not found'));
        }
      }, 200);
    });
  }
}

export default new BlogService();