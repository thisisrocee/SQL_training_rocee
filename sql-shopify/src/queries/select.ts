export const selectCount = (table: string): string => {
  return `select count(*) as c from '${table}'`;
};

export const selectRowById = (id: number, table: string): string => {
  return `select * from '${table}' where id = ${id}`;
};

export const selectCategoryByTitle = (title: string): string => {
  return `select id from categories where title = '${title}'`;
};

export const selectAppCategoriesByAppId = (appId: number): string => {
  return `SELECT apps.title as app_title, 
  apps_categories.category_id, 
  categories.title as category_title
  FROM apps
  JOIN apps_categories ON apps.id = apps_categories.app_id
  JOIN categories ON apps_categories.category_id = categories.id
  WHERE apps.id = ${appId}`;
};

export const selectUnigueRowCount = (tableName: string, columnName: string): string => {
  return `SELECT COUNT(DISTINCT ${columnName}) as c
  FROM ${tableName}`;
};

export const selectReviewByAppIdAuthor = (appId: number, author: string): string => {
  return `SELECT *
  FROM reviews
  WHERE app_id = ${appId} AND author = '${author}'`;
};

export const selectColumnFromTable = (columnName: string, tableName: string): string => {
  return `select ${columnName} from ${tableName}`;
};

