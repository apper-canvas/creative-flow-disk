class ContactService {
  constructor() {
    this.contacts = [];
  }

  async submit(contactData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newContact = {
            ...contactData,
            Id: this.contacts.length + 1,
            timestamp: new Date().toISOString()
          };
          this.contacts.push(newContact);
          resolve({ ...newContact });
        } catch (error) {
          reject(new Error('Failed to submit contact form'));
        }
      }, 500);
    });
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.contacts]);
      }, 200);
    });
  }
}

export default new ContactService();