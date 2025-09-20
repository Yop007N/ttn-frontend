// PROBLEMA ARREGLADO: Se creó servicio centralizado para APIs de TTN
export interface TTNConfig {
  baseURL: string;
  identityServer: string;
  applicationServer: string;
  networkServer: string;
  applicationId?: string;
  apiKey?: string;
}

export interface TTNDevice {
  ids: {
    device_id: string;
    dev_eui: string;
    application_ids: {
      application_id: string;
    };
  };
  created_at: string;
  updated_at: string;
  attributes?: Record<string, any>;
  name?: string;
  description?: string;
  locations?: {
    user?: {
      latitude: number;
      longitude: number;
      altitude?: number;
    };
  };
}

export interface TTNGateway {
  ids: {
    gateway_id: string;
    eui: string;
  };
  created_at: string;
  updated_at: string;
  name?: string;
  description?: string;
  attributes?: Record<string, any>;
  antenna_location?: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  status_public?: boolean;
  location_public?: boolean;
}

export interface TTNApplication {
  ids: {
    application_id: string;
  };
  created_at: string;
  updated_at: string;
  name?: string;
  description?: string;
  attributes?: Record<string, any>;
}

export interface TTNMessage {
  end_device_ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
  };
  correlation_ids: string[];
  received_at: string;
  uplink_message?: {
    session_key_id: string;
    f_port: number;
    frm_payload: string;
    decoded_payload?: Record<string, any>;
    rx_metadata: Array<{
      gateway_ids: {
        gateway_id: string;
      };
      rssi: number;
      snr: number;
      timestamp: number;
    }>;
    settings: {
      data_rate: {
        lora: {
          bandwidth: number;
          spreading_factor: number;
        };
      };
      frequency: string;
    };
  };
}

class TTNAPIService {
  private config: TTNConfig;

  constructor() {
    this.config = {
      baseURL: process.env.REACT_APP_TTN_API_BASE_URL || 'https://nam1.cloud.thethings.network/api/v3',
      identityServer: process.env.REACT_APP_TTN_IDENTITY_SERVER || 'https://nam1.cloud.thethings.network/api/v3/users',
      applicationServer: process.env.REACT_APP_TTN_APPLICATION_SERVER || 'https://nam1.cloud.thethings.network/api/v3/applications',
      networkServer: process.env.REACT_APP_TTN_NETWORK_SERVER || 'https://nam1.cloud.thethings.network/api/v3/gateways',
      applicationId: process.env.REACT_APP_APPLICATION_ID,
      apiKey: process.env.REACT_APP_API_KEY,
    };
  }

  private getAuthHeaders(token?: string): HeadersInit {
    const authToken = token || this.config.apiKey || localStorage.getItem('ttnToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
    }

    return headers;
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(token),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TTN API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  // User authentication methods
  async validateUser(userId: string, token: string): Promise<any> {
    const url = `${this.config.identityServer}/${userId}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async getCurrentUser(token: string): Promise<any> {
    const url = `${this.config.baseURL}/auth_info`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  // Applications methods
  async getApplications(token?: string): Promise<{ applications: TTNApplication[] }> {
    const url = `${this.config.applicationServer}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async getApplication(applicationId: string, token?: string): Promise<TTNApplication> {
    const url = `${this.config.applicationServer}/${applicationId}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  // Devices methods
  async getDevices(applicationId?: string, token?: string): Promise<{ end_devices: TTNDevice[] }> {
    const appId = applicationId || this.config.applicationId;
    if (!appId) {
      throw new Error('Application ID is required');
    }
    const url = `${this.config.applicationServer}/${appId}/devices`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async getDevice(applicationId: string, deviceId: string, token?: string): Promise<TTNDevice> {
    const url = `${this.config.applicationServer}/${applicationId}/devices/${deviceId}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async createDevice(applicationId: string, device: Partial<TTNDevice>, token?: string): Promise<TTNDevice> {
    const url = `${this.config.applicationServer}/${applicationId}/devices`;
    return this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ end_device: device }),
    }, token);
  }

  async updateDevice(applicationId: string, deviceId: string, device: Partial<TTNDevice>, token?: string): Promise<TTNDevice> {
    const url = `${this.config.applicationServer}/${applicationId}/devices/${deviceId}`;
    return this.makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify({ end_device: device }),
    }, token);
  }

  async deleteDevice(applicationId: string, deviceId: string, token?: string): Promise<void> {
    const url = `${this.config.applicationServer}/${applicationId}/devices/${deviceId}`;
    await this.makeRequest(url, { method: 'DELETE' }, token);
  }

  // Gateways methods
  async getGateways(token?: string): Promise<{ gateways: TTNGateway[] }> {
    const url = `${this.config.networkServer}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async getGateway(gatewayId: string, token?: string): Promise<TTNGateway> {
    const url = `${this.config.networkServer}/${gatewayId}`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  async getGatewayStatus(gatewayId: string, token?: string): Promise<any> {
    const url = `${this.config.networkServer}/${gatewayId}/connection_stats`;
    return this.makeRequest(url, { method: 'GET' }, token);
  }

  // Messages and data methods
  async getUplinkMessages(applicationId: string, limit = 100, token?: string): Promise<TTNMessage[]> {
    const url = `${this.config.applicationServer}/${applicationId}/packages/storage/uplink_message`;
    const params = new URLSearchParams({
      limit: limit.toString(),
      order: '-received_at',
    });

    return this.makeRequest(`${url}?${params}`, { method: 'GET' }, token);
  }

  async getDeviceMessages(applicationId: string, deviceId: string, limit = 100, token?: string): Promise<TTNMessage[]> {
    const url = `${this.config.applicationServer}/${applicationId}/devices/${deviceId}/packages/storage/uplink_message`;
    const params = new URLSearchParams({
      limit: limit.toString(),
      order: '-received_at',
    });

    return this.makeRequest(`${url}?${params}`, { method: 'GET' }, token);
  }

  // WebSocket connections for real-time data
  createWebSocketConnection(applicationId: string, token: string): WebSocket {
    const wsUrl = `${this.config.baseURL.replace('https', 'wss')}/applications/${applicationId}/up`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      // Send authentication
      ws.send(JSON.stringify({
        identifiers: [{ application_ids: { application_id: applicationId } }],
        api_key: token,
      }));
    };

    return ws;
  }

  // Utility methods
  updateConfig(newConfig: Partial<TTNConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): TTNConfig {
    return { ...this.config };
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(this.config.baseURL);
      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Export singleton instance
export const ttnAPI = new TTNAPIService();
export default ttnAPI;