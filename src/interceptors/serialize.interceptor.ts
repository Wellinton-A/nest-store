import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable, map } from 'rxjs'

export function serialize(dto: any) {
  return UseInterceptors(new SerializeInterceprtor(dto))
}

export class SerializeInterceprtor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}
