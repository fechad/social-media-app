export const USER = 'Oveezion';
export const DATABASE = 'Social-Media-App';
export const PASSWORD = '123Oveezion';
export const PORT = 5432;
export const HOST = '127.0.0.1';
export const KEEPALIVE = true;

export const SCHEMA_NAME = 'Chymera';


export const END_CHAR = ';';
export const INSERT = (table: string, nbValues: number) => {
    let message = '';

    for (let i = 0; i < nbValues; i++) {
        message += '$' + (i + 1);
        if (i < nbValues - 1) message += ', ';
    }
    return `INSERT INTO ${SCHEMA_NAME}.${table} VALUES(${message})${END_CHAR}`;
};
export const SELECT_ALL = (table: string) => 'SELECT * FROM ' + SCHEMA_NAME + '.' + table;
export const UPDATE = (table: string) => 'UPDATE ' + SCHEMA_NAME + '.' + table + ' SET ';
export const DELETE = (table: string) => 'DELETE FROM ' + SCHEMA_NAME + '.' + table;
export const SELECT_SOME = (names: string[], table: string) => 'SELECT ' + names.join(', ') + ' FROM ' + SCHEMA_NAME + '.' + table;
export const LIST_TABLES = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${SCHEMA_NAME.toLowerCase()}';`;

// Inspiré du site : https://wiki.postgresql.org/wiki/Retrieve_primary_key_columns
export const TABLE_PRIVATE_KEYS = (table: string) =>
    `SELECT a.attname AS name 
     FROM pg_index i 
     JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) 
     WHERE i.indrelid = '${SCHEMA_NAME + '.' + table}'::regclass AND i.indisprimary;`;

// Inspiré du site : https://stackoverflow.com/questions/20194806/how-to-get-a-list-column-names-and-datatypes-of-a-table-in-postgresql
export const TABLE_COLUMNS_TYPES = (table: string) =>
    `SELECT column_name AS name, data_type AS type 
     FROM information_schema.columns 
     WHERE table_schema = '${SCHEMA_NAME.toLowerCase()}' AND table_name = '${table}';`;

// Inspiré du site : https://stackoverflow.com/questions/5347050/postgresql-sql-script-to-get-a-list-of-all-tables-that-have-a-particular-column
export const TABLE_FOREIGN_KEYS = (table: string) =>
    `SELECT 
        (SELECT array_agg(attname) from pg_attribute WHERE attrelid = c.conrelid and ARRAY[attnum] <@ c.conkey) AS col, 
        (SELECT relname from pg_class WHERE oid = c.confrelid) AS ftable 
    FROM pg_constraint c 
    WHERE c.conrelid = (SELECT oid FROM pg_class WHERE relname = '${table}') AND
        c.connamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = '${SCHEMA_NAME.toLowerCase()}') AND
        c.confkey IS NOT NULL;`;
