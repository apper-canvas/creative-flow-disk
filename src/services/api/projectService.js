class ProjectService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "images" } },
          { field: { Name: "featured" } },
          { field: { Name: "date" } },
          { field: { Name: "client" } },
          { field: { Name: "link" } },
          { field: { Name: "technologies" } }
        ]
      };

      const response = await this.apperClient.fetchRecords('project', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "images" } },
          { field: { Name: "featured" } },
          { field: { Name: "date" } },
          { field: { Name: "client" } },
          { field: { Name: "link" } },
          { field: { Name: "technologies" } }
        ]
      };

      const response = await this.apperClient.getRecordById('project', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching project with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async getFeatured() {
    try {
      if (!this.apperClient) this.initializeClient();
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "images" } },
          { field: { Name: "featured" } },
          { field: { Name: "date" } },
          { field: { Name: "client" } },
          { field: { Name: "link" } },
          { field: { Name: "technologies" } }
        ],
        where: [
          {
            FieldName: "featured",
            Operator: "EqualTo",
            Values: ["true"]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('project', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching featured projects:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByCategory(category) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "images" } },
          { field: { Name: "featured" } },
          { field: { Name: "date" } },
          { field: { Name: "client" } },
          { field: { Name: "link" } },
          { field: { Name: "technologies" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('project', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async create(project) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: project.title,
            title: project.title,
            description: project.description,
            category: project.category,
            images: typeof project.images === 'string' ? project.images : project.images.join(','),
            featured: project.featured ? 'true' : 'false',
            date: new Date().toISOString().split('T')[0],
            client: project.client,
            link: project.link,
            technologies: typeof project.technologies === 'string' ? project.technologies : project.technologies.join(','),
            Tags: typeof project.tags === 'string' ? project.tags : project.tags.join(',')
          }
        ]
      };

      const response = await this.apperClient.createRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create project');
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async update(id, projectData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: projectData.title,
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            images: typeof projectData.images === 'string' ? projectData.images : projectData.images.join(','),
            featured: projectData.featured ? 'true' : 'false',
            client: projectData.client,
            link: projectData.link,
            technologies: typeof projectData.technologies === 'string' ? projectData.technologies : projectData.technologies.join(','),
            Tags: typeof projectData.tags === 'string' ? projectData.tags : projectData.tags.join(',')
          }
        ]
      };

      const response = await this.apperClient.updateRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to update project');
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to delete project');
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async getCategories() {
    try {
      const projects = await this.getAll();
      return [...new Set(projects.map(p => p.category))];
    } catch (error) {
      console.error("Error getting categories:", error.message);
      return [];
    }
  }
}

export default new ProjectService();