import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

function mockHost(url = '/test', method = 'GET') {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const host: any = {
    switchToHttp: () => ({
      getResponse: () => ({ status }),
      getRequest: () => ({ url, method }),
    }),
  };
  return { host, status, json };
}

describe('AllExceptionsFilter', () => {
  const filter = new AllExceptionsFilter();

  it('maps an HttpException to its status with a consistent body', () => {
    const { host, status, json } = mockHost('/gems/x');
    filter.catch(new NotFoundException('Gem x not found'), host);

    expect(status).toHaveBeenCalledWith(404);
    const body = json.mock.calls[0][0];
    expect(body).toMatchObject({
      success: false,
      statusCode: 404,
      message: 'Gem x not found',
      path: '/gems/x',
    });
    expect(body.timestamp).toBeDefined();
  });

  it('preserves validation message arrays from BadRequest', () => {
    const { host, json } = mockHost();
    filter.catch(
      new BadRequestException({ message: ['a must be a string'], error: 'Bad Request' }),
      host,
    );
    const body = json.mock.calls[0][0];
    expect(body.message).toEqual(['a must be a string']);
  });

  it('never leaks internals for unknown 500 errors', () => {
    const { host, status, json } = mockHost();
    filter.catch(new Error('DB password is hunter2'), host);

    expect(status).toHaveBeenCalledWith(500);
    const body = json.mock.calls[0][0];
    expect(body.message).toBe('Internal server error');
    expect(JSON.stringify(body)).not.toContain('hunter2');
  });
});
