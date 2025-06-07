export default {
  async fetch(request, env) {
    // Access your D1 database with the binding name 'DATABASE'
    const db = env.DATABASE;

    // Example query to fetch all users from the 'users' table
    const users = await db.prepare('SELECT * FROM users').all();

    return new Response(JSON.stringify(users.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
