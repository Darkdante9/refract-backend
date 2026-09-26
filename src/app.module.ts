import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuoteModule } from "./quote/quote.module";
import { PolicyModule } from "./policy/policy.module";
import { PoolModule } from "./pool/pool.module";
import { OracleModule } from "./oracle/oracle.module";
import { ClaimModule } from "./claim/claim.module";
import { TxModule } from "./tx/tx.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { ApiKeyGuard } from "./auth/api-key.guard";
import configuration, { AppConfig } from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        type: "postgres",
        url: config.get("databaseUrl", { infer: true }),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AuthModule,
    QuoteModule,
    PolicyModule,
    PoolModule,
    OracleModule,
    ClaimModule,
    TxModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
