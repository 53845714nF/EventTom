import axios from 'axios';

class ExampleService {
    async getExample() {
        const response = await fetch('/path/to/api/endpoint');
        return response.json();
    }

    async getExampleAxios() {
        const response = await axios.get('/path/to/api/endpoint');
        return response.data;
    }
}