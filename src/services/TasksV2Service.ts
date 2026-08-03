import { APIHelper } from '../utils/apiHelper';
import { BaseService } from './BaseService';

export class TasksV2Service extends BaseService {
  private readonly tasksEndpoint = '/v2/tasks';

  /**
   * Get all tasks with optional filters
   */
  async getAllTasks(queryParams?: {
    pipelineId?: string;
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<any> {
    const url = this.getFullUrl(this.tasksEndpoint);
    const params = new URLSearchParams();

    if (queryParams?.pipelineId) {
      params.append('pipelineId', queryParams.pipelineId);
    }
    if (queryParams?.limit) {
      params.append('limit', queryParams.limit.toString());
    }
    if (queryParams?.offset) {
      params.append('offset', queryParams.offset.toString());
    }
    if (queryParams?.sort) {
      params.append('sort', queryParams.sort);
    }

    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await this.apiHelper.get(fullUrl, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get task by ID with lookup (resolves references)
   */
  async getTaskByIdWithLookup(taskId?: string): Promise<any> {
    const url = this.getFullUrl(`${this.tasksEndpoint}/lookup`);
    const body = taskId ? { id: taskId } : {};

    const response = await this.apiHelper.post(url, {
      data: body,
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get task by ID without lookup (no reference resolution)
   */
  async getTaskByIdNoLookup(taskId?: string): Promise<any> {
    const url = this.getFullUrl(`${this.tasksEndpoint}/nolookup`);
    const body = taskId ? { id: taskId } : {};

    const response = await this.apiHelper.post(url, {
      data: body,
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get task status by ID
   */
  async getTaskStatus(taskId: string): Promise<any> {
    const url = this.getFullUrl(`${this.tasksEndpoint}/${taskId}/status`);

    const response = await this.apiHelper.get(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Create multiple tasks
   */
  async createTasks(tasks: any[]): Promise<any> {
    const url = this.getFullUrl(this.tasksEndpoint);

    const response = await this.apiHelper.post(url, {
      data: tasks,
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Create single task
   */
  async createTask(taskData: any): Promise<any> {
    const url = this.getFullUrl(this.tasksEndpoint);

    const response = await this.apiHelper.post(url, {
      data: taskData,
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get all tasks with invalid authentication
   */
  async getAllTasksWithInvalidAuth(): Promise<any> {
    const url = this.getFullUrl(this.tasksEndpoint);

    const response = await this.apiHelper.get(url, {
      headers: {
        Authorization: 'Bearer invalid-token-12345',
        'X-Customer-ID': this.getHeaders()['X-Customer-ID'],
      },
    });

    return this.handleResponse(response);
  }
}
