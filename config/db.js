const dbuser = process.env.DB_USER || 'test';
const dbpassword = process.env.DB_PASSWORD || 'test';
const dbhost = process.env.DB_HOST || '';
const dbport = process.env.DB_PORT || '';
const dbname = process.env.DB_NAME || 'ideas';
const development = `mongodb://localhost/${dbname}`;

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return `mongodb://${dbuser}:${dbpassword}@${dbhost}.mlab.com:${dbport}/${dbname}`;
  }
  return development;
};
