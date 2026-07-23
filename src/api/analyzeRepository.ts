import { apiClient } from './client';
import { AnalyzeResponse } from '../types/repository';

export async function analyzeRepository(owner: string, repository: string): Promise<AnalyzeResponse> {
  const response = await apiClient.post<AnalyzeResponse>('/analyze', {
    owner: owner.trim(),
    repository: repository.trim(),
  });
  return response.data;
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200 && response.data?.success === true;
  } catch {
    return false;
  }
}
