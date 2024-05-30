alter table "public"."memories" alter column "embedding" set data type vector(1024) using "embedding"::vector(1024);
