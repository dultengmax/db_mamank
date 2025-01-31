import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Connection {
  getName(): string {
    return 'Connection Service';
  }
}

@Injectable()
export class MysqlConnection extends Connection {
  getName(): string {
    return 'Mysql Connection';
  }
}

@Injectable()
export class PostgresConnection extends Connection {
  getName(): string {
    return 'Postgres Connection';
  }
}

export function createConnection(configService: ConfigService): Connection {
  if (configService.get('database') === 'mysql') {
    return new MysqlConnection();
  } else {
    return new PostgresConnection();
  }
}
