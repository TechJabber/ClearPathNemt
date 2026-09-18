import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;
  private logger = new Logger(SupabaseService.name);

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      this.logger.error('Supabase credentials not configured');
      throw new Error('Missing Supabase configuration');
    }

    this.client = createClient(supabaseUrl, supabaseServiceKey);
    this.logger.log('✅ Supabase client initialized');
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  // Helper methods for common operations
  async insert<T>(table: string, data: any): Promise<T> {
    const { data: result, error } = await this.client.from(table).insert([data]).select();

    if (error) {
      this.logger.error(`Insert error on ${table}:`, error);
      throw error;
    }

    return result?.[0] as T;
  }

  async upsert<T>(table: string, data: any): Promise<T> {
    const { data: result, error } = await this.client
      .from(table)
      .upsert([data])
      .select();

    if (error) {
      this.logger.error(`Upsert error on ${table}:`, error);
      throw error;
    }

    return result?.[0] as T;
  }

  async select<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    let query = this.client.from(table).select();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = (query as any).eq(key, value);
      });
    }

    const { data, error } = await query;

    if (error) {
      this.logger.error(`Select error on ${table}:`, error);
      throw error;
    }

    return data as T[];
  }

  async findOne<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(table)
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows found" which is expected
      this.logger.error(`FindOne error on ${table}:`, error);
      throw error;
    }

    return data as T | null;
  }

  async update<T>(table: string, id: string, data: any): Promise<T> {
    const { data: result, error } = await this.client
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      this.logger.error(`Update error on ${table}:`, error);
      throw error;
    }

    return result as T;
  }

  async delete(table: string, id: string): Promise<void> {
    const { error } = await this.client.from(table).delete().eq('id', id);

    if (error) {
      this.logger.error(`Delete error on ${table}:`, error);
      throw error;
    }
  }

  async call(functionName: string, data?: any) {
    const { data: result, error } = await this.client.functions.invoke(functionName, {
      body: data,
    });

    if (error) {
      this.logger.error(`Function error on ${functionName}:`, error);
      throw error;
    }

    return result;
  }
}
