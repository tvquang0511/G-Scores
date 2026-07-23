import {
  Injectable,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoggingCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger('Cache');

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const key = this.trackBy(context);
    if (!key) {
      return super.intercept(context, next);
    }

    try {
      const cachedValue = await this.cacheManager.get(key);
      if (cachedValue !== undefined && cachedValue !== null) {
        const req = context.switchToHttp().getRequest();
        const url = req.originalUrl || req.url || key;
        this.logger.log(`🟢 [Cache HIT] Returning cached response for ${url}`);
        return of(cachedValue);
      }
    } catch {
      // Continue to handler if cache check fails
    }

    const req = context.switchToHttp().getRequest();
    const url = req.originalUrl || req.url || key;
    this.logger.log(`🟡 [Cache MISS] Executing DB query for ${url}`);

    return super.intercept(context, next);
  }
}
