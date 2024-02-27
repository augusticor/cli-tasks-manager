import { randomUUID } from 'node:crypto';

class Task {
  id = '';
  desc = '';
  achievedIn = null;

  constructor(desc) {
    this.id = randomUUID();
    this.desc = desc;
  }
}

export default Task;
