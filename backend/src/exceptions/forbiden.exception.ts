import HttpException from './http.exception';

export default class ForbidenException extends HttpException {
  constructor() {
    super(403, 'Forbiden');
  }
}
