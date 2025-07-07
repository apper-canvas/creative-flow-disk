import projectsData from '@/services/mockData/projects.json';

class ProjectService {
  constructor() {
    this.projects = [...projectsData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.projects]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = this.projects.find(p => p.Id === parseInt(id));
        if (project) {
          resolve({ ...project });
        } else {
          reject(new Error('Project not found'));
        }
      }, 200);
    });
  }

  async getFeatured() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = this.projects.filter(p => p.featured);
        resolve([...featured]);
      }, 250);
    });
  }

  async getByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.projects.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
        resolve([...filtered]);
      }, 200);
    });
  }

  async create(project) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject = {
          ...project,
          Id: Math.max(...this.projects.map(p => p.Id)) + 1,
          date: new Date().toISOString().split('T')[0]
        };
        this.projects.push(newProject);
        resolve({ ...newProject });
      }, 400);
    });
  }

  async update(id, projectData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.projects.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.projects[index] = { ...this.projects[index], ...projectData };
          resolve({ ...this.projects[index] });
        } else {
          reject(new Error('Project not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.projects.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.projects.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error('Project not found'));
        }
      }, 200);
    });
  }

  getCategories() {
    return [...new Set(this.projects.map(p => p.category))];
  }
}

export default new ProjectService();