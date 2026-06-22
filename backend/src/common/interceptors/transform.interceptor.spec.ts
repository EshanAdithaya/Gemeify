import { of, lastValueFrom } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';

function run(payload: any) {
  const interceptor = new TransformInterceptor();
  const next = { handle: () => of(payload) };
  return lastValueFrom(interceptor.intercept({} as any, next as any));
}

describe('TransformInterceptor', () => {
  it('enriches a { message, data } envelope with success + timestamp', async () => {
    const result = await run({ message: 'Gems retrieved', data: [1, 2] });
    expect(result).toMatchObject({
      success: true,
      message: 'Gems retrieved',
      data: [1, 2],
    });
    expect(result.timestamp).toBeDefined();
  });

  it('leaves probe-style payloads (health/root) untouched', async () => {
    const health = { status: 'ok', version: '1.0.0' };
    const result = await run(health);
    expect(result).toEqual(health);
    expect(result.success).toBeUndefined();
  });

  it('does not double-wrap an already-wrapped response', async () => {
    const already = { success: true, message: 'x', data: 1 };
    const result = await run(already);
    expect(result).toBe(already);
  });

  it('passes raw arrays through unchanged', async () => {
    const arr = [1, 2, 3];
    expect(await run(arr)).toBe(arr);
  });
});
